export const fetchNode = (uniqueId) => {
    console.log(uniqueId);
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const today  = new Date();
    const date = today.toLocaleDateString('fi-FI');
    const PATH = '/api/node/';
    const PARAMS = `${uniqueId}/${date}/attributes`;
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            let responseJSON = await response.json();
            console.log(responseJSON);
            dispatch(apiGetNodeAttributesSuccessCall(responseJSON));
        }
    };
};

export const apiGetNodeAttributesSuccessCall = data => {
    return {
        type: 'SUCCESS_API_GET_NODE_ATTRIBUTES',
        payload: data
    };
};
