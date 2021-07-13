import { combineReducers } from 'redux';
import helloReducer from './helloReducer';

const rootReducer = combineReducers({
    hr : helloReducer
});

export default rootReducer;
