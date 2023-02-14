const initialState = {
  edit: false,
};

const editModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_MODE_SUCCESS':
      return {
        ...state,
        edit: action.payload,
      };
    default:
      return state;
  }
};

export default editModeReducer;
