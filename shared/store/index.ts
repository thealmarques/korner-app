import { createStore, applyMiddleware } from 'redux';
import { Reducers } from './reducers';
import logger from 'redux-logger';

export const Store = createStore(Reducers, applyMiddleware(logger));