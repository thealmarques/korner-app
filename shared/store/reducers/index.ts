import { combineReducers } from 'redux';
import { userLocation } from './userLocation';

export const Reducers = combineReducers({
    userLocation: userLocation,
});