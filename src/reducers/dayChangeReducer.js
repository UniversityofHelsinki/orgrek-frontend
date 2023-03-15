import format from 'date-fns/format';

const initialState = {
  selectedDay: format(new Date(), 'yyyy-MM-dd'),
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
