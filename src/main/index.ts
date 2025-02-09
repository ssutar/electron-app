import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import { db } from './dbManager';
import { insertFakeData, startDB } from './dbScripts';

// console.log('#################################', app.getAppPath(), app.getPath('userData'), {
//   mode: import.meta.env.MODE,
//   env: process.env,
// });

let mainWindow: BrowserWindow;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  startDB(db);
  insertFakeData(db);

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));
  ipcMain.on('print', async () => {
    const printers = await mainWindow.webContents.getPrintersAsync();
    console.log(printers);
    mainWindow.webContents.print(
      {
        printBackground: true,
        copies: 1,
        landscape: true,
      },
      (success, _error) => {
        if (success) {
          console.log('printed');
        } else {
          console.log('failed');
        }
      },
    );
  });

  /**
   * Updates
   */

  ipcMain.handle('getAllUpdates', (_, teacherId) => {
    // SELECT u.*, s.title as subject, t.name as teacherName FROM Updates u JOIN Subjects s ON (u.subjectId = s.id) JOIN Teachers t ON (u.teacherId = t.id) WHERE u.teacherId = '1'
    const stmt = db.prepare(
      'SELECT u.*, s.title as subject FROM Updates u JOIN Subjects s ON (u.subjectId = s.id) WHERE u.teacherId = @teacherId',
    );
    const result = stmt.all({ teacherId });
    return result;
  });

  ipcMain.handle('searchUpdates', (_, { subjectId, teacherId, grade }) => {
    const stmt = db.prepare(
      'SELECT u.*, s.title as subject FROM Updates u JOIN Subjects s ON (u.subjectId = s.id) WHERE u.teacherId = @teacherId AND u.subjectId = @subjectId AND u.grade = @grade',
    );
    const result = stmt.all({ teacherId, subjectId, grade });
    return result;
  });

  ipcMain.handle('insertUpdate', (_, update) => {
    const stmt = db.prepare(`INSERT INTO Updates
      (teacherId, grade, subjectId, teachingMethod, teachingAid, boardWork, objectives, teacherProcedure, studentProcedure, onlineMedium, homeWork)
      VALUES (@teacherId, @grade, @subjectId, @teachingMethod, @teachingAid, @boardWork, @objectives, @teacherProcedure, @studentProcedure, @onlineMedium, @homeWork);
    `);
    return stmt.run(update);
  });

  ipcMain.handle('deleteUpdate', (_, updateId) => {
    const stmt = db.prepare('DELETE FROM Updates WHERE id = @updateId');
    return stmt.run({ updateId });
  });

  /**
   * Daily Updates
   */

  ipcMain.handle('linkDailyUpdate', (_, linkDailyUpdateFormData) => {
    const stmt = db.prepare(`INSERT INTO DailyUpdates
      (date, period, updateId, teacherId)
      VALUES(@date, @period, @updateId, @teacherId);
    `);
    return stmt.run(linkDailyUpdateFormData);
  });

  ipcMain.handle('getDailyUpdateHeaderByDate', (_, { date, teacherId }) => {
    const stmt = db.prepare(
      `SELECT duh.*, ds.special as daySpecial, gt.thought as goodThought
      FROM DailyUpdatesHeaders duh 
      LEFT OUTER JOIN DaySpecials ds ON (ds.id = duh.daySpecialId AND ds.teacherId = duh.teacherId)
      LEFT OUTER JOIN GoodThoughts gt ON (gt.id = duh.goodThoughtId AND gt.teacherId = duh.teacherId)
      WHERE duh.date = @date AND duh.teacherId = @teacherId`,
    );
    const result = stmt.get({ date, teacherId });
    return result;
  });

  ipcMain.handle('getDailyUpdatesByDate', (_, { teacherId, date }) => {
    const stmt = db.prepare(
      `SELECT 
        du.date, 
        du.period, 
        u.*, 
        s.title as subject
      FROM DailyUpdates du LEFT OUTER JOIN Updates u ON (du.updateId = u.id) 
      LEFT OUTER JOIN Subjects s ON (u.subjectId = s.id AND u.teacherId = s.teacherId)
      WHERE du.date = @date AND du.teacherId = @teacherId`,
    );
    const result = stmt.all({ date, teacherId });
    return result;
  });

  ipcMain.handle('dailyUpdateHeaderFormData', (_, dailyUpdateHeaderFormData) => {
    const stmt = db.prepare(`
      INSERT INTO DailyUpdatesHeaders
      (date, goodThoughtId, daySpecialId, teacherId)
      VALUES(@date, @goodThoughtId, @daySpecialId, @teacherId);
    `);
    return stmt.run(dailyUpdateHeaderFormData);
  });

  /**
   * Subjects
   */
  ipcMain.handle('getAllSubjects', (_, teacherId) => {
    const stmt = db.prepare('SELECT * FROM Subjects WHERE teacherId = @teacherId');
    const result = stmt.all({ teacherId });
    return result;
  });

  ipcMain.handle('insertSubject', (_, params) => {
    const stmt = db.prepare(`INSERT INTO Subjects
      (title, teacherId)
      VALUES(@title, @teacherId)
    `);
    const result = stmt.run(params);
    return result;
  });

  /**
   * Good thoughts and Day specials
   */
  ipcMain.handle('getAllGoodThoughts', (_, teacherId) => {
    const stmt = db.prepare('SELECT * FROM GoodThoughts WHERE teacherId = @teacherId');
    const result = stmt.all({ teacherId });
    return result;
  });

  ipcMain.handle('insertGoodThought', (_, goodThoughtFormData) => {
    const stmt = db.prepare(`INSERT INTO GoodThoughts
      (teacherId, thought)
      VALUES(@teacherId, @thought);
    `);
    return stmt.run(goodThoughtFormData);
  });

  ipcMain.handle('getAllDaySpecials', (_, teacherId) => {
    const stmt = db.prepare('SELECT * FROM DaySpecials WHERE teacherId = @teacherId');
    const result = stmt.all({ teacherId });
    return result;
  });

  ipcMain.handle('insertDaySpecial', (_, daySpecialFormData) => {
    const stmt = db.prepare(`INSERT INTO DaySpecials
      (teacherId, special)
      VALUES(@teacherId, @special);
    `);
    return stmt.run(daySpecialFormData);
  });

  /**
   * Schools
   */
  ipcMain.handle('getSchools', () => {
    const stmt = db.prepare('SELECT * FROM Schools');
    const result = stmt.all();
    return result;
  });

  /**
   * Authentication
   */
  ipcMain.handle('signup', (_, signupFormData) => {
    const stmt = db.prepare(`INSERT INTO Teachers
      (name, schoolId, email, password)
      VALUES(@name, @schoolId, @email, @password);
    `);
    return stmt.run(signupFormData);
  });

  ipcMain.handle('login', (_, loginFormData) => {
    const stmt = db.prepare(`SELECT *
      FROM Teachers WHERE email = @email AND password = @password;
    `);
    const result = stmt.all(loginFormData);
    return result[0];
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
