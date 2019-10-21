// import I18n from 'react-native-i18n';
// import en from '../../locales/en.json';

// I18n.fallbacks = true;

// I18n.translations = {
//   en,
// };
// // I18n.defaultLocale = 'en';

// export default I18n;

import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from '../../locales/en.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
};

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL =
  currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name: any, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
