const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';

export const fetchTree = (selection, selectedDay) => {
    const PATH = '/api/tree/';
    const date = selectedDay ? selectedDay.toLocaleDateString('EN-CA') : new Date().toLocaleDateString('EN-CA');
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${selection}/byDate/${date}`, {
            headers: { 'Content-Type': 'application/json' }
        }).catch(error => console.log(error));
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetTreeSuccessCall(responseJSON));
        }
    };
};

export const fetchSelectableHierarchies = () => {
    const PATH = '/api/edge/';
    const PARAMS = 'types';
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetSelectableHierarchiesSuccessCall(responseJSON));
        }
    };
};

export const apiGetTreeSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_TREE',
        payload: data
    };
};

export const apiGetSelectableHierarchiesSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_SELECTABLE_HIERARCHIES',
        payload: data
    };
};
