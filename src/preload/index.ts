import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type {
  IDailyUpdate,
  IDailyUpdateHeaderFormData,
  IDaySpecial,
  IGoodThought,
  ILinkDailyUpdateFormData,
  ILinkDailyUpdateSearchFormData,
  ILoginFormData,
  ISchool,
  ISignupFormData,
  ISubject,
  IUpdate,
  IUpdateFormData,
} from '../interfaces';
import { get } from 'http';

// Custom APIs for renderer
export const api = {
  getAllSubjects: (teacherId: string): Promise<ISubject[]> => {
    return ipcRenderer.invoke('getAllSubjects', teacherId);
  },
  getSchools: (): Promise<ISchool[]> => {
    return ipcRenderer.invoke('getSchools');
  },

  /** Updates */
  getAllUpdates: (teacherId: string): Promise<IUpdate[]> => {
    return ipcRenderer.invoke('getAllUpdates', teacherId);
  },
  insertUpdate: (update: IUpdateFormData) => {
    return ipcRenderer.invoke('insertUpdate', update);
  },
  deleteUpdate: (updateId: string) => {
    return ipcRenderer.invoke('deleteUpdate', updateId);
  },
  searchUpdates: (params: ILinkDailyUpdateSearchFormData) => {
    return ipcRenderer.invoke('searchUpdates', params);
  },

  /** Daily Updates */
  linkDailyUpdate: (linkDailyUpdateFormData: ILinkDailyUpdateFormData) => {
    return ipcRenderer.invoke('linkDailyUpdate', linkDailyUpdateFormData);
  },
  print: () => {
    ipcRenderer.send('print');
  },
  getDailyUpdatesByDate: ({
    teacherId,
    date,
  }: {
    teacherId: string;
    date: string;
  }): Promise<IDailyUpdate[]> => {
    return ipcRenderer.invoke('getDailyUpdatesByDate', { teacherId, date });
  },

  /** Good Thoughts and Day Specials */
  getAllGoodThoughts: (teacherId: string) => {
    return ipcRenderer.invoke('getAllGoodThoughts', teacherId);
  },
  getAllDaySpecials: (teacherId: string) => {
    return ipcRenderer.invoke('getAllDaySpecials', teacherId);
  },
  insertGoodThought: (goodThought: IGoodThought) => {
    return ipcRenderer.invoke('insertGoodThought', goodThought);
  },
  insertDaySpecial: (daySpecial: IDaySpecial) => {
    return ipcRenderer.invoke('insertDaySpecial', daySpecial);
  },
  getDailyUpdateHeaderByDate: ({ date, teacherId }: { date: string; teacherId: string }) => {
    return ipcRenderer.invoke('getDailyUpdateHeaderByDate', { date, teacherId });
  },
  linkDailyUpdateHeader: (dailyUpdateHeaderFormData: IDailyUpdateHeaderFormData) => {
    return ipcRenderer.invoke('dailyUpdateHeaderFormData', dailyUpdateHeaderFormData);
  },

  /** Auth */
  signup: (signupFormData: ISignupFormData) => {
    return ipcRenderer.invoke('signup', signupFormData);
  },
  login: (loginFormData: ILoginFormData) => {
    return ipcRenderer.invoke('login', loginFormData);
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
