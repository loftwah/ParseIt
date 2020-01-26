import { combineReducers } from 'redux';
import textReducer from './text';

export default combineReducers({
    textRed: textReducer,
});