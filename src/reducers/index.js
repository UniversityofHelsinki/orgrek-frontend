import { combineReducers } from 'redux';
import treeReducer from './treeReducer';

const rootReducer = combineReducers({
    tr : treeReducer
});

export default rootReducer;
