const initialState = {
  selectedDay: new Date(),
};

const dayChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DAY_CHANGE_SUCCESS':
      return {
        ...state,
        selectedDay: action.payload,
      };
    default:
      return state;
  }
};

export default dayChangeReducer;
