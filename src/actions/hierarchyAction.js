export const fetchNodeParents = (uniqueId) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const today  = new Date();
    const date = today.toLocaleDateString('fi-FI');
    const PATH = '/api/node/parents/';
    const PARAMS = `${uniqueId}/${date}`;
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

export const fetchNodeChildren = (uniqueId) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const today  = new Date();
    const date = today.toLocaleDateString('fi-FI');
    const PATH = '/api/node/children/';
    const PARAMS = `${uniqueId}/${date}`;
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
