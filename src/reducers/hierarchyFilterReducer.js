
const initialState = {
    hierarchyFilters: [],
    validhierarchyFilters: []
};

const hierarchyFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_HIERARCHY_FILTERS':
            return {
                ...state,
                hierarchyFilters: action.payload
            };
        case 'GET_VALID_HIERARCHY_FILTERS':
            return {
                ...state,
                validhierarchyFilters: action.payload
            };
        case 'SET_HIERARCHY_FILTERS':
            return {
                ...state,
                hierarchyFilters: action.payload
            };
        case 'INSERT_HIERARCHY_FILTERS_SUCCESS':
        case 'INSERT_HIERARCHY_FILTERS_ERROR':
        case 'UPDATE_HIERARCHY_FILTER_SUCCESS':
        case 'UPDATE_HIERARCHY_FILTER_ERROR':
        case 'DELETE_HIERARCHY_FILTER_SUCCESS':
        case 'DELETE_HIERARCHY_FILTER_ERROR':
            return {
                ...state,
                feedback: action.payload
            };
        case 'CLEAR_HIERARCHY_FILTER_MESSAGE':
            return {
                ...state,
                feedback: undefined
            };
        default:
            return state;
    }
};

export default hierarchyFiltersReducer;
