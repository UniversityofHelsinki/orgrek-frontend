
const initialState = {
    user: { eppn: '', preferredLanguage: '', displayName: '', roles: [] },
    redirect401: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_API_GET_USER':
        return {
            ...state,
            user: action.payload
        };
    case 'STATUS_401_API_CALL':
        return {
            ...state,
            redirect401: action.payload
        };
    default:
        return state;
    }
};

export default userReducer;
