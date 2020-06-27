/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-sub-hidden';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyC-SE7tpz3EDP9Jc8r0inKkC7da-cYWn80',
  authDomain: 'eschernode.firebaseapp.com',
  databaseURL: 'https://eschernode.firebaseio.com',
  projectId: 'eschernode',
  storageBucket: 'eschernode.appspot.com',
  messagingSenderId: '256191929846',
  appId: '1:256191929846:web:94887cb6f569c398457bd7',
  measurementId: 'G-2EPXWR3M21',
};

export const searchPath = '#';
export const servicePath =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/api/'
    : 'https://api.eschernode.com/api/';

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = false;
export const defaultColor = 'dark.greenmoss';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isDemo = false;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
