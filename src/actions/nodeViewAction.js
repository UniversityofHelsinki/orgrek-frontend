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

export const updateParentUnitProperties = (properties) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/parentUnit/properties';

    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(properties)
        });
        if (response.status === 200) {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'update_parent_unit_properties_success', success: true }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        } else {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'update_parent_unit_properties_error', success: false, statusCode: response.status }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        }
    };
};


export const updateAttributes = (uniqueId, attributes, skipValidation) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/attributes/';
    //const SKIP_VALIDATION = '/false';
    //const PARAMS = `${uniqueId}${SKIP_VALIDATION}`;
    const PARAMS = `${uniqueId}/${skipValidation}`;

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
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'update_attributes_success', success: true, skipValidation: skipValidation }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        } else {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'update_attributes_error', success: false, statusCode: response.status, skipValidation: skipValidation }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        }
    };
};

export const updateNodeProperties = (uniqueId, properties) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/properties/';
    const PARAMS = `${uniqueId}`;

    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}${PARAMS}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(properties)
        });
        if (response.status === 200) {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'update_properties_success', success: true }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        } else {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'update_properties_error', success: false, statusCode: response.status }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        }
    };
};
