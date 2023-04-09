import {combineReducers} from 'redux';
import owner from './owner';
import applicant from './applicant';
import employee from './employee';

export const reducers = combineReducers({
    owner,
    applicant,
    employee
})
