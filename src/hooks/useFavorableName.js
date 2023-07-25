import { useSelector } from 'react-redux';
import useContentLanguage from './useContentLanguage';
import { useGetFavorableFullNamesQuery } from '../store';

const useFavorableName = (nodeId) => {
  const selectedDay = useSelector((state) => state.dr.selectedDay);
  const { data: names, loading } = useGetFavorableFullNamesQuery({
    nodeId,
    date: selectedDay,
  });
  const contentLanguage = useContentLanguage();
  if (loading || !names) {
    return '';
  }
  return names[contentLanguage]?.[0]?.name;
};

export default useFavorableName;
