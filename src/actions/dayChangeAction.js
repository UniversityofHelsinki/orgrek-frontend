export const changeDate = (day) => {
  return (dispatch) => {
    dispatch(changeDaySuccessCall(day));
  };
};

export const changeDaySuccessCall = (data) => {
  return {
    type: 'DAY_CHANGE_SUCCESS',
    payload: data,
  };
};
