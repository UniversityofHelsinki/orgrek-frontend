
const initialState = {
    nodeAttributes : null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_API_GET_NODE_ATTRIBUTES':
        return {
            ...state,
            nodeAttributes: action.payload
        };
    default:
        return state;
    }
};

export default userReducer;
