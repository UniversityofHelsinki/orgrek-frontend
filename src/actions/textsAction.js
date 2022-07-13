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