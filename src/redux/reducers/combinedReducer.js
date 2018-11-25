import { combineReducers } from 'redux';
import user from './user';
import query from './query';

export default combineReducers({ user, query });