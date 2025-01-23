import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import { db } from './dbManager';
import { startDB } from './dbScripts';

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
  mainWindow.webContents.openDevTools();

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

  ipcMain.handle('getUpdatesByDate', (_, date) => {
    const stmt = db.prepare('SELECT * FROM DailyUpdates WHERE date = @date');
    const result = stmt.all({ date });
    return result;
  });

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
      'SELECT * FROM Updates WHERE teacherId = @teacherId AND subjectId = @subjectId AND grade = @grade',
    );
    const result = stmt.all({ teacherId, subjectId, grade });
    return result;
  });

  ipcMain.handle('getAllSubjects', (_, teacherId) => {
    const stmt = db.prepare('SELECT * FROM Subjects WHERE teacherId = @teacherId');
    const result = stmt.all({ teacherId });
    return result;
  });

  ipcMain.handle('getSchools', () => {
    const stmt = db.prepare('SELECT * FROM Schools');
    const result = stmt.all();
    return result;
  });

  ipcMain.handle('insertUpdate', (_, update) => {
    const stmt = db.prepare(`INSERT INTO Updates
      (teacherId, grade, subjectId, teachingMethod, teachingAid, boardWork, objectives, teacherProcedure, studentProcedure, onlineMedium, homeWork)
      VALUES (@teacherId, @grade, @subjectId, @teachingMethod, @teachingAid, @boardWork, @objectives, @teacherProcedure, @studentProcedure, @onlineMedium, @homeWork);
    `);
    return stmt.run(update);
  });

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
