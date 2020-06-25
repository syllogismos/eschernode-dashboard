import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import filters from './filters/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  filters,
});

export default reducers;
