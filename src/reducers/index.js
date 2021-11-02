import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import hierarchyReducer from './hierarchyReducer';
import userReducer from './userReducer';
import nodeReducer from './nodeReducer';

const rootReducer = combineReducers({
    tree : treeReducer,
    hr : hierarchyReducer,
    nrd : nodeReducer,
    ur : userReducer
});

export default rootReducer;
