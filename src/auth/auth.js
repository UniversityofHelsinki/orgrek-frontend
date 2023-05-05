const roleAdmin = 'ROLE_ADMIN';
const roleWriter = 'ROLE_WRITER';
const roleReader = 'ROLE_READER';

const allWriterRoles = [roleAdmin, roleWriter];
const allRoles = [roleReader, ...allWriterRoles];

/**
 * Defines which actions are allowed for each role.
 */
export const authActions = {
  nameAttributes: {
    // View action not actually used but is here as an example and for
    // testing purposes
    view: { allowRoles: allRoles },
    edit: { allowRoles: allWriterRoles },
  },
  codeAttributes: {
    edit: { allowRoles: allWriterRoles },
  },
  unitType: {
    edit: { allowRoles: allWriterRoles },
  },
  texts: {
    edit: { allowRoles: [roleAdmin] },
  },
  hierarchyFilters: {
    edit: { allowRoles: [roleAdmin] },
  },
  nodeValidity: {
    edit: { allowRoles: allWriterRoles },
  },
};

/**
 * Checks if the given user has permission for the given action.
 *
 * @param user user object must have roles
 * @param action one of the defined actions
 * @return {boolean} true if user is authorized to do the given action
 */
export const isAuthorized = (user, action) => {
  if (typeof action !== 'object') {
    console.error('Invalid action', action);
    throw new Error('Expected action as object');
  } else if (!Array.isArray(action.allowRoles)) {
    console.error('Invalid action', action);
    throw new Error(`Action is missing allowRoles`);
  }

  return action.allowRoles.some((role) => user.roles.includes(role));
};

/**
 * Check if the given user has admin role.
 *
 * Prefer action-based authorization isAuthorized instead of this function.
 *
 * @param user user object must have roles
 * @return {boolean} true if user is admin
 */
export const isAdmin = (user) => {
  return user.roles.includes(roleAdmin);
};
