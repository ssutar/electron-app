import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { en, mr } from './assets/locales';

i18next.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
  debug: true,
  // lng: 'mr',
  fallbackLng: 'en',
  resources: {
    en,
    mr
  }
});
