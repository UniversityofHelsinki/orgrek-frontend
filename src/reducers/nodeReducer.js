
const initialState = {
    node : null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_API_GET_NODE':
        return {
            ...state,
            node: action.payload
        };
    default:
        return state;
    }
};

export default userReducer;
