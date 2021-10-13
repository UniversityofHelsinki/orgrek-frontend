import { combineReducers } from 'redux';
import treeReducer from './treeReducer';

const rootReducer = combineReducers({
    tree : treeReducer
});

export default rootReducer;
