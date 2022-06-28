
const initialState = {
    parents: null,
    children: null,
    parentsFuture: null,
    parentsHistory: null,
    childrenFuture: null,
    childrenHistory: null
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
    case 'SUCCESS_API_GET_PARENTS_HISTORY':
        return {
            ...state,
            parentsHistory: action.payload
        };
    case 'CLEAR_PARENTS_HISTORY':
        return {
            ...state,
            parentsHistory: undefined,
        };
    case 'SUCCESS_API_GET_CHILDREN_HISTORY':
        return {
            ...state,
            childrenHistory: action.payload
        };
    case 'CLEAR_CHILDREN_HISTORY':
        return {
            ...state,
            childrenHistory: undefined
        };
    case 'SUCCESS_API_GET_PARENTS_FUTURE':
        return {
            ...state,
            parentsFuture: action.payload
        };
    case 'CLEAR_PARENTS_FUTURE':
        return {
            ...state,
            parentsFuture: undefined
        };
    case 'SUCCESS_API_GET_CHILDREN_FUTURE':
        return {
            ...state,
            childrenFuture: action.payload
        };
    case 'CLEAR_CHILDREN_FUTURE':
        return {
            ...state,
            childrenFuture: undefined
        };
    default:
        return state;
    }
};

export default hierarchyReducer;
