export const fetchNodeParents = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/parents/';
    const PARAMS = `${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetParentsSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetParentsSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_PARENTS',
        payload: data
    };
};

export const fetchNodeParentsHistory = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/historyandcurrent/parents/';
    const PARAMS = `${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetParentsHistorySuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetParentsHistorySuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_PARENTS_HISTORY',
        payload: data
    };
};

export const fetchNodeParentsFuture = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/futureandcurrent/parents/';
    const PARAMS = `${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetParentsFutureSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetParentsFutureSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_PARENTS_FUTURE',
        payload: data
    };
};

export const fetchNodeChildren = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/children/';
    const PARAMS = `${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetChildrenSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetChildrenSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_CHILDREN',
        payload: data
    };
};

export const fetchNodeChildrenHistory = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/historyandcurrent/children/';
    const PARAMS = `${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetChildrenHistorySuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetChildrenHistorySuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_CHILDREN_HISTORY',
        payload: data
    };
};

export const fetchNodeChildrenFuture = (uniqueId, selectedDay) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const date = selectedDay ? selectedDay.toLocaleDateString('fi-FI') : new Date().toLocaleDateString('fi-FI');
    const PATH = '/api/node/futureandcurrent/children/';
    const PARAMS = `${uniqueId}/${date}`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetChildrenFutureSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetChildrenFutureSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_CHILDREN_FUTURE',
        payload: data
    };
};

export const api401FailureCall = failureTime => ({
    type: 'STATUS_401_API_CALL',
    payload : failureTime
});