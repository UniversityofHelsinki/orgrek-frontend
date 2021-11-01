import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import hierarchyReducer from './hierarchyReducer';
import nodeReducer from './nodeReducer';

const rootReducer = combineReducers({
    tree : treeReducer,
    hr : hierarchyReducer,
    nrd : nodeReducer
});

export default rootReducer;
