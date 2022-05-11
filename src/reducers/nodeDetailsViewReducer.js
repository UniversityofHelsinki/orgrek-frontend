const initialState = {
   showHistory: false,
   showComing: false
};

const nodeDetailsViewReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SWITCH_SHOW_HISTORY':
        return {
            ...state,
            showHistory: action.payload
        };
    case 'SWITCH_SHOW_COMING':
        return {
            ...state,
            showComing: action.payload
        };
    default:
        return state;
    }
};

export default nodeDetailsViewReducer;
