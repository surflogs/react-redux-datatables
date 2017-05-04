import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import main from './main.js';
export default combineReducers({
  main,
	routing: routerReducer
});
