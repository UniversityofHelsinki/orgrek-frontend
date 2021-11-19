export const fetchUser = () => {
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/user';
    return async (dispatch)  => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`);
        if(response.status === 200) {
            let responseJSON = await response.json();
            dispatch(apiGetUserSuccessCall(responseJSON));
        } else {
            dispatch(api401FailureCall(new Date()));
        }
    };
};

export const apiGetUserSuccessCall = data => {
    return{
        type: 'SUCCESS_API_GET_USER',
        payload: data
    };
};


export const api401FailureCall = failureTime => ({
    type: 'STATUS_401_API_CALL',
    payload : failureTime
});
