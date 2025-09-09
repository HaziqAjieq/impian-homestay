import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation file
import translationEN from '../locales/en/translation.json';
import translationMS from '../locales/ms/translation.json';

// resource object
const resources ={
  en:{
    translation: translationEN,
  },
  ms:
  {
    translation: translationMS,
  },
};
  // Initialize
  i18n
  .use (LanguageDetector)
    .use(initReactI18next)
    .init({
      resources, // translation files
      lng:'ms', //Default language
      fallbackLng:'ms', // Use English if translation is missing.
      debug: false,//Set true to see loggin in the console

      // detector plugin
      detection: {
        order:['localStorage' , 'navigator'],
        caches:['localStorage'],
      },

      // React already protect from xxs injection
      interpolation:{
        escapeValue : false,
      },
    });

export default i18n;


