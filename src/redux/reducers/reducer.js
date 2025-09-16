import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import formReducer from './formReducer';

export const rootReducer = combineReducers({
    login: loginReducer,
    forms: formReducer
});