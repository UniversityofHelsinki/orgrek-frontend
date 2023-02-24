import { useSelector } from 'react-redux';
import useContentLanguage from './useContentLanguage';

const useFavorableName = () => {
  const favorableNames = useSelector((state) => state.nrd.nodeFavorableNames);
  const contentLanguage = useContentLanguage();
  return favorableNames[contentLanguage]?.[0]?.name;
};

export default useFavorableName;
