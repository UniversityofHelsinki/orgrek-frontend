import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import hierarchyReducer from './hierarchyReducer';
import dayChangeReducer from './dayChangeReducer';

const rootReducer = combineReducers({
    tree : treeReducer,
    hr: hierarchyReducer,
    dr: dayChangeReducer
});

export default rootReducer;
