
const initialState = {
    nodeAttributes : null,
};

const nodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS_API_GET_NODE_ATTRIBUTES':
            return {
                ...state,
                nodeAttributes: action.payload
            };
        case 'SUCCESS_API_GET_NODE':
            return {
                ...state,
                node: action.payload
            };
        default:
            return state;
    }
};

export default nodeReducer;
