export const addNewAttributeAction = (nodeId, attribute, skipValidation) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/attributes/';
    //const SKIP_VALIDATION = '/false';
    const PARAMS = `${nodeId}/${skipValidation}`;

    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attribute)
        });
        if (response.status === 200 || response.status === 201) {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'insert_attributes_success', success: true, skipValidation: skipValidation }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        } else {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'insert_attributes_error', success: false, statusCode: response.status, skipValidation: skipValidation }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        }
    };
};
