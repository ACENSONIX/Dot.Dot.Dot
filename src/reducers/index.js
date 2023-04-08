import {combineReducers} from 'redux';
import owner from './owner';
import applicant from './applicant';

export const reducers = combineReducers({
    owner,
    applicant
})
