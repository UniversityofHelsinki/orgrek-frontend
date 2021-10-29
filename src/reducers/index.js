import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import hierarchyReducer from './hierarchyReducer';

const rootReducer = combineReducers({
    tree : treeReducer,
    hr: hierarchyReducer
});

export default rootReducer;
