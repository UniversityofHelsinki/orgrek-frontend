const initialState = {
  feedback: undefined,
  feedback_stored: undefined,
  nodeAttributes: null,
  nodeAttributesHistory: null,
  nodeAttributesFuture: null,
  nodePredecessors: { fi: [], sv: [], en: [], ia: [] },
  nodeSuccessors: { fi: [], sv: [], en: [], ia: [] },
  nodeDisplayNames: { fi: [], sv: [], en: [], ia: [] },
  nodeFavorableNames: {
    fi: undefined,
    en: undefined,
    sv: undefined,
    ia: undefined,
  },
};

// eslint-disable-next-line complexity
const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      if (action.payload.skipValidation === true) {
        state.feedback_stored = null;
      } else if (action.payload.skipValidation === false) {
        state.feedback_stored = action.payload;
      }
      return {
        ...state,
        feedback: action.payload,
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        feedback: null,
      };
    case 'SUCCESS_API_GET_NODE_ATTRIBUTES':
      return {
        ...state,
        nodeAttributes: action.payload,
      };
    case 'SUCCESS_API_GET_NODE_ATTRIBUTES_HISTORY':
      return {
        ...state,
        nodeAttributesHistory: action.payload,
      };
    case 'CLEAR_NODE_ATTRIBUTES_HISTORY':
      return {
        ...state,
        nodeAttributesHistory: undefined,
      };
    case 'SUCCESS_API_GET_NODE_ATTRIBUTES_FUTURE':
      return {
        ...state,
        nodeAttributesFuture: action.payload,
      };
    case 'CLEAR_NODE_ATTRIBUTES_FUTURE':
      return {
        ...state,
        nodeAttributesFuture: undefined,
      };
    case 'SUCCESS_API_GET_NODE':
      return {
        ...state,
        node: action.payload,
      };
    case 'SUCCESS_API_GET_NODE_PREDECESSORS':
      return {
        ...state,
        nodePredecessors: action.payload,
      };
    case 'SUCCESS_API_GET_NODE_SUCCESSORS':
      return {
        ...state,
        nodeSuccessors: action.payload,
      };
    case 'SUCCESS_API_GET_NODE_FULL_NAMES':
      return {
        ...state,
        nodeDisplayNames: action.payload,
      };
    case 'SUCCESS_API_GET_FULL_NAMES_HISTORY':
      return {
        ...state,
        nodeDisplayNames: action.payload,
      };
    case 'SUCCESS_API_GET_FULL_NAMES_FUTURE':
      return {
        ...state,
        nodeDisplayNames: action.payload,
      };
    case 'SUCCESS_API_GET_FULL_NAMES_ALL':
      return {
        ...state,
        nodeDisplayNames: action.payload,
      };
    case 'SUCCESS_API_GET_NODE_FAVORABLE_FULL_NAMES':
      return {
        ...state,
        nodeFavorableNames: action.payload,
      };
    case 'CLEAR_FULL_NAMES_HISTORY':
      return {
        ...state,
        nodeDisplayNames: initialState.nodeDisplayNames,
      };
    case 'CLEAR_FULL_NAMES_FUTURE':
      return {
        ...state,
        nodeDisplayNames: initialState.nodeDisplayNames,
      };
    case 'OPEN_TREE':
      return {
        ...state,
        openTree: action.payload,
      };
    default:
      return state;
  }
};

export default nodeReducer;
