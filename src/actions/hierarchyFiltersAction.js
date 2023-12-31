export const fetchHierarchyFilters = () => {
  const ORGREK_BACKEND_SERVER =
    process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
  const PATH = 'api/hierarchyFilters';
  return async (dispatch) => {
    let response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`);
    if (response.status === 200) {
      dispatch({
        type: 'GET_ALL_HIERARCHY_FILTERS',
        payload: await response.json(),
      });
    } else {
      dispatch({
        type: 'GET_ALL_HIERARCHY_FILTERS_FAILURE',
        payload: response.status,
      });
    }
  };
};

export const fetchValidHierarchyFilters = () => {
  const ORGREK_BACKEND_SERVER =
    process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
  const PATH = 'api/hierarchyFilters';
  const DATE = new Date().toLocaleDateString('fi-FI');
  return async (dispatch) => {
    let response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}/${DATE}`);
    if (response.status === 200) {
      dispatch({
        type: 'GET_VALID_HIERARCHY_FILTERS',
        payload: await response.json(),
      });
    } else {
      dispatch({
        type: 'GET_VALID_HIERARCHY_FILTERS_FAILURE',
        payload: response.status,
      });
    }
  };
};

export const updateHierarchyFilter = (hierarchyFilter) => {
  const formatted = {
    ...hierarchyFilter,
    startDate: hierarchyFilter.startDate
      ? new Date(hierarchyFilter.startDate).toISOString()
      : null,
    endDate: hierarchyFilter.endDate
      ? new Date(hierarchyFilter.endDate).toISOString()
      : null,
  };
  const ORGREK_BACKEND_SERVER =
    process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
  const PATH = 'api/hierarchyFilters';
  return async (dispatch) => {
    const response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatted),
    });
    if (response.status === 200) {
      dispatch({
        type: 'UPDATE_HIERARCHY_FILTER_SUCCESS',
        payload: {
          hierarchyFilter: await response.json(),
          message: 'update_hierarchy_filters_success',
          success: true,
        },
      });
    } else {
      dispatch({
        type: 'UPDATE_HIERARCHY_FILTER_ERROR',
        payload: {
          message: 'update_hierarchy_filters_error',
          success: false,
          statusCode: response.status,
        },
      });
    }
  };
};

export const deleteHierarchyFilter = (hierarchyFilter) => {
  const ORGREK_BACKEND_SERVER =
    process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
  const PATH = 'api/hierarchyFilters';
  return async (dispatch) => {
    const response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hierarchyFilter),
    });
    if (response.status === 200) {
      dispatch({
        type: 'DELETE_HIERARCHY_FILTER_SUCCESS',
        payload: { message: 'delete_hierarchy_filters_success', success: true },
      });
    } else {
      dispatch({
        type: 'DELETE_HIERARCHY_FILTER_ERROR',
        payload: {
          message: 'delete_hierarchy_filters_error',
          success: false,
          statusCode: response.status,
        },
      });
    }
  };
};

export const insertHierarchyFilters = (hierarchyFilters) => {
  const formatted = hierarchyFilters.map((hierarchyFilter) => ({
    ...hierarchyFilter,
    startDate: hierarchyFilter.startDate
      ? new Date(hierarchyFilter.startDate).toISOString()
      : null,
    endDate: hierarchyFilter.endDate
      ? new Date(hierarchyFilter.endDate).toISOString()
      : null,
  }));
  const ORGREK_BACKEND_SERVER =
    process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';
  const PATH = 'api/hierarchyFilters';
  return async (dispatch) => {
    const response = await fetch(`${ORGREK_BACKEND_SERVER}/${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatted),
    });
    if (response.status === 200) {
      dispatch({
        type: 'INSERT_HIERARCHY_FILTERS_SUCCESS',
        payload: {
          hierarchyFilters: await response.json(),
          message: 'insert_hierarchy_filters_success',
          success: true,
        },
      });
    } else {
      dispatch({
        type: 'INSERT_HIERARCHY_FILTERS_ERROR',
        payload: {
          message: 'insert_hierarchy_filters_error',
          success: false,
          statusCode: response.status,
        },
      });
    }
  };
};

export const setHierarchyFilters = (hierarchyFilters) => {
  return {
    type: 'SET_HIERARCHY_FILTERS',
    payload: hierarchyFilters,
  };
};
