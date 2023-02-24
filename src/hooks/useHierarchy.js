import { useSelector } from 'react-redux';

const useHierarchy = () =>
  useSelector((state) => ({
    parents: state.hr.parents,
    children: state.hr.children,
  }));

export default useHierarchy;
