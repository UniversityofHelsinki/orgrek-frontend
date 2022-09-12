export const editMode = (edit) => {
    return (dispatch)  => {
        dispatch(changeEditModeSuccessCall(edit));
    };
};

export const changeEditModeSuccessCall = data => {
    return {
        type: 'EDIT_MODE_SUCCESS',
        payload: data
    };
};
