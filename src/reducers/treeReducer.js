const initialState = { tree : {} };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_API_GET_TREE':
        return {
            ...state,
            tree: action.payload
        };
    default:
        return state;
    }
};

export default userReducer;
