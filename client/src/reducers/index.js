import { combineReducers } from 'redux';

import alert from './alert'
import auth from './auth'
import subjects from './subjects'
import posts from './posts'


export default combineReducers({
    alert,
    auth,
    subjects,
    posts,
});