import { combineReducers } from "redux";

import postReducers from './postReducers';
import authReducers from './authReducers';

export default combineReducers({ postReducers, authReducers });