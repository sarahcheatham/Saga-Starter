import { combineReducers } from 'redux';
import profileReducers from "./Profile";

export const rootReducer = combineReducers({
  profile: profileReducers,
});