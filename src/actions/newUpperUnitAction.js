const createNewUpperUnit = (selectedOrganisationUnit, selectedHierarchy, startDate, endDate, node) => {
    return {
        selectedParentOrganisationUnit: { id: selectedOrganisationUnit.id, uniqueId: selectedOrganisationUnit.uniqueId, name: selectedOrganisationUnit.name },
        selectedHierarchy: selectedHierarchy,
        startDate: startDate,
        endDate: endDate,
        node: node
    };
};

export const actionAddNewUpperUnit = async (selectedOrganisationUnit, selectedHierarchy, startDate, endDate, node) => {
    const newUpperUnit = createNewUpperUnit(selectedOrganisationUnit, selectedHierarchy, startDate, endDate, node);
    const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
    const PATH = '/api/node/addNewUpperUnit';
    try {
        let response = await fetch(`${ORGREK_BACKEND_SERVER}${PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUpperUnit)
        });
        if(response.status === 200) {
            let responseJSON = await response.json();
            return responseJSON;
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        throw new Error(error);
    }
};
