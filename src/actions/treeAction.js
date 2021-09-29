export const fetchTree = () => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/tree';
    const PARAMS = '/opetus';
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetTreeSuccessCall(responseJSON));
        }
    };
};

export const apiGetTreeSuccessCall = data => {
    return{
        type: 'SUCCESS_API_GET_TREE',
        payload: data
    };
};
