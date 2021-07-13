
const initialState = { message : {} };

const userReducer = (state = initialState, action) => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case 'SUCCESS_API_GET_HELLO_MESSAGE':
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
