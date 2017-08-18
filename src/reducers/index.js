import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import api from './api';
import global from './global';

export default combineReducers({
  routing: routerReducer,
  counter,
  api,
  global
});
