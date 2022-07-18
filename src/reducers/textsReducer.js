const initialState = {
    texts: []
};

const textsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TEXTS':
            return {
                ...state,
                texts: action.payload
            };
        case 'SET_TEXTS':
            return {
                ...state,
                texts: action.payload
            };
        case 'INSERT_TEXTS_SUCCESS':
        case 'INSERT_TEXTS_ERROR':
        case 'UPDATE_TEXT_SUCCESS':
        case 'UPDATE_TEXT_ERROR':
        case 'DELETE_TEXT_SUCCESS':
        case 'DELETE_TEXT_ERROR':
            return {
                ...state,
                feedback: action.payload
            };
        case 'CLEAR_TEXT_MESSAGE':
            return {
                ...state,
                feedback: undefined
            };
        default:
            return state;
    }
};

export default textsReducer;