import { useSelector } from 'react-redux';

const useNode = () => useSelector((state) => state.nrd.node);

export default useNode;
