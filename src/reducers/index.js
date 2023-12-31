import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import hierarchyReducer from './hierarchyReducer';
import dayChangeReducer from './dayChangeReducer';
import userReducer from './userReducer';
import nodeReducer from './nodeReducer';
import nodeDetailsViewReducer from './nodeDetailsViewReducer';
import textsReducer from './textsReducer';
import hierarchyFiltersReducer from './hierarchyFilterReducer';
import editModeReducer from './editModeReducer';

const rootReducer = combineReducers({
  tree: treeReducer,
  hr: hierarchyReducer,
  nrd: nodeReducer,
  ur: userReducer,
  dr: dayChangeReducer,
  nvrd: nodeDetailsViewReducer,
  texts: textsReducer,
  hierarchyFilters: hierarchyFiltersReducer,
  editModeReducer: editModeReducer,
});

export default rootReducer;
