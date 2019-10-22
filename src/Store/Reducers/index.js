import { combineReducers } from 'redux';
import profileReducers from "./Profile";
import batchStatusReducers from './BatchStatus';

export const rootReducer = combineReducers({
  profile: profileReducers,
  batches: batchStatusReducers
});