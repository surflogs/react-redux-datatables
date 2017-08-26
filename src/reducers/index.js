import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import main from './main';
import reactDatatableReducer from './react-datatable-reducer';
export default combineReducers({
  main,
  routing: routerReducer,
  datatable : reactDatatableReducer
});
