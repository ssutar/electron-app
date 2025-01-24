import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type {
  ILinkDailyUpdateFormData,
  ILinkDailyUpdateSearchFormData,
  ILoginFormData,
  ISchool,
  ISignupFormData,
  ISubject,
  IUpdate,
  IUpdateFormData,
} from '../interfaces';

// Custom APIs for renderer
export const api = {
  getUpdatesByDate: (date: string): Promise<IUpdate[]> => {
    return ipcRenderer.invoke('getUpdatesByDate', date);
  },
  getAllUpdates: (teacherId: string): Promise<IUpdate[]> => {
    return ipcRenderer.invoke('getAllUpdates', teacherId);
  },
  getAllSubjects: (teacherId: string): Promise<ISubject[]> => {
    return ipcRenderer.invoke('getAllSubjects', teacherId);
  },
  getSchools: (): Promise<ISchool[]> => {
    return ipcRenderer.invoke('getSchools');
  },
  insertUpdate: (update: IUpdateFormData) => {
    return ipcRenderer.invoke('insertUpdate', update);
  },
  deleteUpdate: (updateId: string) => {
    return ipcRenderer.invoke('deleteUpdate', updateId);
  },
  print: () => {
    ipcRenderer.send('print');
  },
  signup: (signupFormData: ISignupFormData) => {
    return ipcRenderer.invoke('signup', signupFormData);
  },
  login: (loginFormData: ILoginFormData) => {
    return ipcRenderer.invoke('login', loginFormData);
  },
  searchUpdates: (params: ILinkDailyUpdateSearchFormData) => {
    return ipcRenderer.invoke('searchUpdates', params);
  },
  linkUpdate: (linkUpdateFormData: ILinkDailyUpdateFormData) => {
    return ipcRenderer.invoke('linkUpdate', linkUpdateFormData);
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
