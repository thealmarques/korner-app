import { combineReducers } from 'redux';
import { saveLocation } from './saveLocation';

export const Reducers = combineReducers({
    saveLocation: saveLocation,
});