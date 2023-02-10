export const fetchTexts = () => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = 'api/texts';
    return async (dispatch) => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`);
        if (response.status === 200) {
            dispatch({
                type: 'GET_ALL_TEXTS',
                payload: await response.json()
            });
        } else {
            dispatch({
                type: 'GET_ALL_TEXTS_FAILURE',
                payload: response.status
            });
        }
    };
};

export const insertTexts = (texts) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = 'api/texts';
    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(texts)
        });
        if (response.status === 200) {
            dispatch({
                type: 'INSERT_TEXTS_SUCCESS',
                payload: { texts: await response.json(), message: 'insert_texts_success', success: true }
            });
        } else {
            dispatch({
                type: 'INSERT_TEXTS_ERROR',
                payload: { message: 'insert_texts_error', success: false, statusCode: response.status }
            });
        }
    };
};

export const updateText = (text) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = 'api/texts';
    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text)
        });
        if (response.status === 200) {
            dispatch({
                type: 'UPDATE_TEXT_SUCCESS',
                payload: { text: await response.json(), message: 'update_text_success', success: true }
            });
        } else {
            dispatch({
                type: 'UPDATE_TEXT_ERROR',
                payload: { message: 'update_texts_error', success: false, statusCode: response.status }
            });
        }
    };
};

export const deleteText = (text) => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = 'api/texts';
    return async (dispatch) => {
        const response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text)
        });
        if (response.status === 200) {
            dispatch({
                type: 'DELETE_TEXT_SUCCESS',
                payload: { message: 'delete_text_success', success: true }
            });
        } else {
            dispatch({
                type: 'DELETE_TEXT_ERROR',
                payload: { message: 'delete_text_error', success: false, statusCode: response.status }
            });
        }

    };
};

export const clearTextMessage = () => {
    return {
        type: 'CLEAR_TEXT_MESSAGE'
    };
};

export const setTexts = (texts) => {
    return {
        type: 'SET_TEXTS',
        payload: texts
    };
};