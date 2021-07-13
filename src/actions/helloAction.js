export const fetchHelloMessage = () => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/hello';
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`);
        if (response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetHelloMessageSuccessCall(responseJSON));
        }
    };
};

export const apiGetHelloMessageSuccessCall = data => {
    return{
        type: 'SUCCESS_API_GET_HELLO_MESSAGE',
        payload: data
    };
};
