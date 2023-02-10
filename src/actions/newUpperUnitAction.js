const createNewUpperUnit = (selectedOrganisationUnit, selectedHierarchy, startDate, endDate, node) => {
    return {
        parentNodeId: selectedOrganisationUnit.id,
        childNodeId: node.id,
        hierarchy: selectedHierarchy,
        startDate: startDate,
        endDate: endDate,
    };
};

export const actionAddNewUpperUnit = (selectedOrganisationUnit, selectedHierarchy, startDate, endDate, node) => {
    const newUpperUnit = createNewUpperUnit(selectedOrganisationUnit, selectedHierarchy, startDate, endDate, node);
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/addNewUpperUnit';
    return async (dispatch) => {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUpperUnit)
        });
        if (response.status === 200) {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'insert_new_upper_unit_success', success: true }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        } else {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload: { message: 'insert_new_upper_unit_error', success: false, statusCode: response.status }
            });
            setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000);
        }
    };
};


