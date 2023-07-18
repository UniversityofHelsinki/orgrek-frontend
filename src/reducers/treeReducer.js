import { defaultHierarchy } from '../Constants';
const initialState = {
  selectedHierarchy: undefined,
  defaultHierarchy,
  selectableHierarchies: [],
};

const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS_API_GET_SELECTABLE_HIERARCHIES':
      return {
        ...state,
        selectableHierarchies: action.payload,
      };
    case 'SWITCH_HIERARCHY':
      return {
        ...state,
        selectedHierarchy: action.payload,
      };
    default:
      return state;
  }
};

export default treeReducer;
