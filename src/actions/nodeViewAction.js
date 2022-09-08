export const switchHistory = value => {
    return{
        type: 'SWITCH_SHOW_HISTORY',
        payload: value
    };
};

export const switchComing = value => {
    return{
        type: 'SWITCH_SHOW_COMING',
        payload: value
    };
};

export const updateAttributes = (uniqueId, attributes) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/attributes/';
    const PARAMS = `${uniqueId}`;

    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attributes)
        });
        if (response.status === 200) {
            dispatch({
                type: 'UPDATE_ATTRIBUTES_SUCCESS',
                payload: { message: 'update_attributes_success', success: true }
            });
        } else {
            dispatch({
                type: 'UPDATE_ATTRIBUTES_ERROR',
                payload: { message: 'update_attributes_error', success: false, statusCode: response.status }
            });
        }
    };
};
