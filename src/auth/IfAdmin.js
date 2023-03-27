import { isAdmin } from './auth';
import useCurrentUser from '../hooks/useCurrentUser';

/**
 * Renders content only if current user has admin role.
 *
 * @param children
 */
const IfAdmin = ({ children }) => {
  const user = useCurrentUser();

  if (!isAdmin(user)) {
    return null;
  }

  return children;
};

export default IfAdmin;
