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