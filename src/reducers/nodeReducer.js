
const initialState = {
    nodeAttributes : null,
    nodeAttributesHistory: null,
    nodeAttributesFuture: null,
    nodePredecessors : { fi: [], sv: [], en: [], ia: [] },
    nodeSuccessors : { fi: [], sv: [], en: [], ia: [] },
    nodeDisplayNames: { fi: [], sv: [], en: [], ia: [] },
};

const nodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS_API_GET_NODE_ATTRIBUTES':
            return {
                ...state,
                nodeAttributes: action.payload
            };
        case 'SUCCESS_API_GET_NODE_ATTRIBUTES_HISTORY':
            return {
                ...state,
                nodeAttributesHistory: action.payload
            };
        case 'CLEAR_NODE_ATTRIBUTES_HISTORY':
            return {
                ...state,
                nodeAttributesHistory: undefined,
            };
        case 'SUCCESS_API_GET_NODE_ATTRIBUTES_FUTURE':
            return {
                ...state,
                nodeAttributesFuture: action.payload
            };
        case 'CLEAR_NODE_ATTRIBUTES_FUTURE':
            return {
                ...state,
                nodeAttributesFuture: undefined,
            };
        case 'SUCCESS_API_GET_NODE':
            return {
                ...state,
                node: action.payload
            };
        case 'SUCCESS_API_GET_NODE_PREDECESSORS':
            return {
              ...state,
              nodePredecessors: action.payload
            };
        case 'SUCCESS_API_GET_NODE_SUCCESSORS':
            return {
                ...state,
                nodeSuccessors: action.payload
            };
        case 'SUCCESS_API_GET_NODE_FULL_NAMES':
            return {
                ...state,
                nodeDisplayNames: action.payload
            };
        case 'SUCCESS_API_GET_FULL_NAMES_HISTORY':
            return {
                ...state,
                nodeDisplayNames: action.payload
            };
        case 'SUCCESS_API_GET_FULL_NAMES_FUTURE':
            return {
                ...state,
                nodeDisplayNames: action.payload
            };
        case 'SUCCESS_API_GET_FULL_NAMES_ALL':
            return {
                ...state,
                nodeDisplayNames: action.payload
            };
        case 'CLEAR_FULL_NAMES_HISTORY':
            return {
                ...state,
                nodeDisplayNames: initialState.nodeDisplayNames
            };
        case 'CLEAR_FULL_NAMES_FUTURE': return {
                ...state,
                nodeDisplayNames: initialState.nodeDisplayNames
            };
        default:
            return state;
    }
};

export default nodeReducer;
