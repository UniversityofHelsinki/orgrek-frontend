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

export const fetchNodeFullNames = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : '';
    const PATH = `/api/node/fullname/${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeFullNamesSuccessCall(responseJSON));
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
export const apiGetNodeFullNamesSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_FULL_NAMES',
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

export const fetchNodePredecessors = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/predecessors/';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PARAMS = `${uniqueId}/${date}`;
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

export const fetchNodeSuccessors = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/successors/';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PARAMS = `${uniqueId}/${date}`;
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

export const fetchNodeFullNamesHistory = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = `/api/node/fullname/historyandcurrent/${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeFullNamesHistorySuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetNodeFullNamesHistorySuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_FULL_NAMES_HISTORY',
        payload: data
    };
};

export const fetchNodeFullNamesFuture = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = `/api/node/fullname/futureandcurrent/${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetNodeFullNamesFutureSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const fetchNodeFullNamesAll = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = `/api/node/fullname/all/${uniqueId}/`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetAllFullNamesSuccess(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetAllFullNamesSuccess = data => {
    return {
        type: 'SUCCESS_API_GET_FULL_NAMES_ALL',
        payload: data
    };
};


export const clearFullNamesHistory = () => {
    return {
        type: 'CLEAR_FULL_NAMES_HISTORY'
    };
};

export const clearFullNamesFuture = () => {
    return {
        type: 'CLEAR_FULL_NAMES_FUTURE'
    };
};

export const apiGetNodeFullNamesFutureSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_FULL_NAMES_FUTURE',
        payload: data
    };
};

export const apiGetNodeSuccessorsSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_SUCCESSORS',
        payload: data
    };
};

export const clearNodeHistory = () => {
    return {
        type: 'CLEAR_NODE_ATTRIBUTES_HISTORY'
    };
};

export const clearNodeFuture = () => {
    return {
        type: 'CLEAR_NODE_ATTRIBUTES_FUTURE'
    };
};

export const clearNodeDetails = () => {
    return {
        type: 'CLEAR_NODE_DETAILS'
    };
};