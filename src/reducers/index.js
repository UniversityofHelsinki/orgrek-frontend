import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import hierarchyReducer from './hierarchyReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    tree : treeReducer,
    hr: hierarchyReducer,
    ur : userReducer
});

export default rootReducer;
