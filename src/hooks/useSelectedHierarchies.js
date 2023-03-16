import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

/**
 * Updates router search params when selected hierarchies change.
 */
const useSelectedHierarchies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { selectableHierarchies, selectedHierarchy, defaultHierarchy } =
    useSelector((state) => ({
      selectableHierarchies: state.tree.selectableHierarchies,
      selectedHierarchy: state.tree.selectedHierarchy,
      defaultHierarchy: state.tree.defaultHierarchy,
    }));

  const setHierarchies = (hierarchies) =>
    dispatch({
      type: 'SWITCH_HIERARCHY',
      payload: hierarchies,
    });

  useEffect(() => {
    setHierarchies(searchParams.get('hierarchies'));
  }, []);

  useEffect(() => {
    const hierarchies = searchParams.get('hierarchies');

    if (hierarchies && selectableHierarchies?.length > 0) {
      const valid = hierarchies
        .split(',')
        .every((hierarchy) => selectableHierarchies.includes(hierarchy));

      if (valid) {
        setHierarchies(hierarchies);
      } else {
        setHierarchies(defaultHierarchy);
      }
    } else if (selectableHierarchies?.length > 0) {
      setHierarchies(defaultHierarchy);
    }
  }, [selectableHierarchies]);

  useEffect(() => {
    if (selectedHierarchy) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('hierarchies', selectedHierarchy);
      setSearchParams(newParams);
    }
  }, [selectedHierarchy]);
};

export default useSelectedHierarchies;
