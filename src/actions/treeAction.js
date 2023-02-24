const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';

export const fetchTree = (selection, selectedDay) => {
  const PATH = '/api/tree/';
  const date = selectedDay
    ? selectedDay.toLocaleDateString('FI-fi')
    : new Date().toLocaleDateString('FI-fi');
  return async (dispatch) => {
    let response = await fetch(
      `${ORGREK_BACKEND_SERVER}${PATH}${selection}/${date}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    ).catch((error) => console.log(error));
    if (response.status === 200) {
      let responseJSON = await response.json();
      dispatch(apiGetTreeSuccessCall(responseJSON));
    } else {
      dispatch(api401FailureCall(new Date()));
    }
  };
};

export const fetchTreeWithAllHierarchies = (hierarchies, selectedDate) => {
  const PATH = '/api/tree/';
  const date = selectedDate.toLocaleDateString('FI-fi');
  return async (dispatch) => {
    let response = await fetch(
      `${ORGREK_BACKEND_SERVER}${PATH}${hierarchies}/${date}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    ).catch((error) => console.log(error));
    if (response.status === 200) {
      let responseJSON = await response.json();
      dispatch(apiGetTreeWithAllHierarchiesSuccessCall(responseJSON));
    } else {
      //dispatch(api401FailureCall(new Date()));
    }
  };
};

export const api401FailureCall = (failureTime) => ({
  type: 'STATUS_401_API_CALL',
  payload: failureTime,
});

export const fetchSelectableHierarchies = () => {
  const PATH = '/api/edge/';
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

export const apiGetTreeSuccessCall = (data) => {
  return {
    type: 'SUCCESS_API_GET_TREE',
    payload: data,
  };
};

export const apiGetTreeWithAllHierarchiesSuccessCall = (data) => {
  return {
    type: 'SUCCESS_API_GET_TREE_WITH_ALL_HIERARCHIES',
    payload: data,
  };
};

export const apiGetSelectableHierarchiesSuccessCall = (data) => {
  return {
    type: 'SUCCESS_API_GET_SELECTABLE_HIERARCHIES',
    payload: data,
  };
};
