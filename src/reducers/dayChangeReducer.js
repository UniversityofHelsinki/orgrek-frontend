const midnight = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const initialState = {
  selectedDay: midnight(new Date()),
};

const dayChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DAY_CHANGE_SUCCESS':
      return {
        ...state,
        selectedDay: midnight(action.payload),
      };
    default:
      return state;
  }
};

export default dayChangeReducer;
