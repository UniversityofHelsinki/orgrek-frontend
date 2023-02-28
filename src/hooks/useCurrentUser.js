import { useSelector } from 'react-redux';

const useCurrentUser = () => useSelector((state) => state.ur.user);

export default useCurrentUser;
