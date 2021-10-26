import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import nodeReducer from './nodeReducer';

const rootReducer = combineReducers({
    tree : treeReducer,
    nrd : nodeReducer
});

export default rootReducer;
