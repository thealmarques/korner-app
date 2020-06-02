import { combineReducers } from 'redux';
import { userLocation } from './userLocation';
import { userReducer } from './user.reducers';

export const Reducers = combineReducers({
    userLocation: userLocation,
    user: userReducer
});