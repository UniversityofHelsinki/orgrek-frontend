
const initialState = {
};

const hierarchyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS_API_GET_TREE':
            return {
                ...state,
                tree: action.payload
            };
        case 'SWITCH_HIERARCHY':
            return {
                ...state,
                selectedHierarchy: action.payload
            };
        default:
            return state;
    }
};

export default hierarchyReducer;
