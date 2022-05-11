
const initialState = {
    nodeAttributes : null,
    nodeAttributesHistory: null,
    nodeAttributesFuture: null,
    nodePredecessors : null,
    nodeSuccessors : null
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
        case 'SUCCESS_API_GET_NODE_ATTRIBUTES_FUTURE':
            return {
                ...state,
                nodeAttributesFuture: action.payload
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
        default:
            return state;
    }
};

export default nodeReducer;
