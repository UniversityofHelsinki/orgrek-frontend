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
        default:
            return state;
    }
};

export default textsReducer;