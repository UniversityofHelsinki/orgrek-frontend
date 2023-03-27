import { roleAdmin } from '../../constants/roles';

const allWriterRoles = [roleAdmin];
const allRoles = ['ROLE_READER', ...allWriterRoles];

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
