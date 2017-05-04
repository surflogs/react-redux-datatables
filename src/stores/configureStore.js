import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './../reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const logger = createLogger();
const router = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(router, logger)(createStore);

const configureStore = (initialState) => (
	createStoreWithMiddleware(rootReducer, initialState)
)

module.exports = configureStore;
