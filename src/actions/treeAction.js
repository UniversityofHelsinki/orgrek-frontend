const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';

export const api401FailureCall = (failureTime) => ({
  type: 'STATUS_401_API_CALL',
  payload: failureTime,
});

export const fetchSelectableHierarchies = () => {
  const PATH = '/api/hierarchy/';
  const PARAMS = 'types';
  return async (dispatch) => {
    let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      let responseJSON = await response.json();
      dispatch(apiGetSelectableHierarchiesSuccessCall(responseJSON));
    } else {
      dispatch(api401FailureCall(new Date()));
    }
  };
};

export const apiGetSelectableHierarchiesSuccessCall = (data) => {
  return {
    type: 'SUCCESS_API_GET_SELECTABLE_HIERARCHIES',
    payload: data,
  };
};
