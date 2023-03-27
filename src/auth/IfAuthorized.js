import useCurrentUser from '../hooks/useCurrentUser';
import { isAuthorized } from './auth';
import PropTypes from 'prop-types';

/**
 * Renders content only if current user has permission for the given action.
 */
const IfAuthorized = ({ action, children }) => {
  const user = useCurrentUser();

  if (!isAuthorized(user, action)) {
    return null;
  }

  return children;
};

IfAuthorized.propTypes = {
  /** One of the actions defined in auth.js */
  action: PropTypes.object.isRequired,
};

export default IfAuthorized;
