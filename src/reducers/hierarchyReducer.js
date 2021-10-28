
const initialState = {
    parents: [],
    children: []
};

const hierarchyReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_API_GET_PARENTS':
        return {
            ...state,
            parents: action.payload
        };
    case 'SUCCESS_API_GET_CHILDREN':
        return {
            ...state,
            children: action.payload
        };
    default:
        return state;
    }
};

export default hierarchyReducer;
