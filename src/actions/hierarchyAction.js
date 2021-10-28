export const fetchNodeParents = (param) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/parents/';
    const PARAMS = param;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetParentsSuccessCall(responseJSON));
        }
    };
};

export const apiGetParentsSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_PARENTS',
        payload: data
    };
};

export const fetchNodeChildren = (param) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/children/';
    const PARAMS = param;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetChildrenSuccessCall(responseJSON));
        }
    };
};

export const apiGetChildrenSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_CHILDREN',
        payload: data
    };
};
