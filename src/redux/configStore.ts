import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers';
import logger from 'redux-logger';

const middlewares = [reduxThunk];
export const store = createStore(rootReducer,applyMiddleware(...middlewares,logger));

