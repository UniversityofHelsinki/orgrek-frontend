const initialState = {
  tree: {},
  selectedHierarchy: undefined,
  defaultHierarchy: 'talous',
  selectableHierarchies: [],
  treeWithAllHierarchies: {},
  selectedHierarchies: [],
};

const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS_API_GET_TREE':
      return {
        ...state,
        tree: action.payload,
      };
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
    case 'SUCCESS_API_GET_TREE_WITH_ALL_HIERARCHIES':
      return {
        ...state,
        treeWithAllHierarchies: action.payload,
      };
    case 'SELECTED_HIERARCHIES_SUCCESS':
      return {
        ...state,
        selectedHierarchies: action.payload,
      };
    default:
      return state;
  }
};

export default treeReducer;
