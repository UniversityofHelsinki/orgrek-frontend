export const fetchNode = (uniqueId) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = `/api/node/${uniqueId}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const api401FailureCall = failureTime => ({
    type: 'STATUS_401_API_CALL',
    payload : failureTime
});

export const apiGetNodeSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE',
        payload: data
    };
};

export const fetchNodeAttributes = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/';
    const PARAMS = `${uniqueId}/${date}/attributes`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeAttributesSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetNodeAttributesSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_ATTRIBUTES',
        payload: data
    };
};

export const fetchNodeAttributesHistory = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/historyandcurrent/';
    const PARAMS = `${uniqueId}/${date}/attributes`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeAttributesHistorySuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetNodeAttributesHistorySuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_ATTRIBUTES_HISTORY',
        payload: data
    };
};

export const fetchNodeAttributesFuture = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/futureandcurrent/';
    const PARAMS = `${uniqueId}/${date}/attributes`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeAttributesFutureSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetNodeAttributesFutureSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_ATTRIBUTES_FUTURE',
        payload: data
    };
};

export const fetchNodePredecessors = (uniqueId) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/predecessors/';
    const PARAMS = `${uniqueId}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodePredecessorsSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetNodePredecessorsSuccessCall = data => {
  return {
      type: 'SUCCESS_API_GET_NODE_PREDECESSORS',
      payload: data
  };
};

export const fetchNodeSuccessors = (uniqueId) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/successors/';
    const PARAMS = `${uniqueId}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeSuccessorsSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetNodeSuccessorsSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_SUCCESSORS',
        payload: data
    };
};
