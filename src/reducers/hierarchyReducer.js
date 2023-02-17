const initialState = {
  parents: { fi: [], sv: [], en: [], ia: [] },
  children: { fi: [], sv: [], en: [], ia: [] },
  parentsFuture: { fi: [], sv: [], en: [], ia: [] },
  parentsHistory: { fi: [], sv: [], en: [], ia: [] },
  childrenFuture: { fi: [], sv: [], en: [], ia: [] },
  childrenHistory: { fi: [], sv: [], en: [], ia: [] },
};

const hierarchyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS_API_GET_PARENTS':
      return {
        ...state,
        parents: action.payload,
      };
    case 'SUCCESS_API_GET_CHILDREN':
      return {
        ...state,
        children: action.payload,
      };
    case 'SUCCESS_API_GET_PARENTS_HISTORY':
      return {
        ...state,
        parents: action.payload,
      };
    case 'SUCCESS_API_GET_PARENTS_ALL':
      return {
        ...state,
        parents: action.payload,
      };
    case 'CLEAR_PARENTS_HISTORY':
      return {
        ...state,
        parentsHistory: initialState.parentsHistory,
      };
    case 'SUCCESS_API_GET_CHILDREN_HISTORY':
      return {
        ...state,
        children: action.payload,
      };
    case 'SUCCESS_API_GET_CHILDREN_ALL':
      return {
        ...state,
        children: action.payload,
      };
    case 'CLEAR_CHILDREN_HISTORY':
      return {
        ...state,
        children: initialState.childrenHistory,
      };
    case 'SUCCESS_API_GET_PARENTS_FUTURE':
      return {
        ...state,
        parents: action.payload,
      };
    case 'CLEAR_PARENTS_FUTURE':
      return {
        ...state,
        parents: initialState.parentsFuture,
      };
    case 'SUCCESS_API_GET_CHILDREN_FUTURE':
      return {
        ...state,
        children: action.payload,
      };
    case 'CLEAR_CHILDREN_FUTURE':
      return {
        ...state,
        children: initialState.childrenFuture,
      };
    default:
      return state;
  }
};

export default hierarchyReducer;
