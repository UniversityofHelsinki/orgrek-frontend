import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';

/**
 * By default, returns only current values from the given attributes.
 * History and future is shown only when show history or show coming is
 * selected.
 */
const useFilterUnitsByDate = (data, showHistory, showFuture) => {
  const { selectedDay } = useSelector((state) => ({
    selectedDay: state.dr.selectedDay,
  }));

  let date;
  if (typeof selectedDay === 'string') {
    date = parseISO(selectedDay);
  } else {
    date = selectedDay;
  }

  const isStartDateAfterSelectedDay = (item) =>
    item.startDate && isAfter(parseISO(item.startDate), date);
  const isEndDateBeforeSelectedDay = (item) =>
    item.endDate && isBefore(parseISO(item.endDate), date);

  return useMemo(() => {
    const filteredByDate = data.map((parent) => {
      const hierarchies = parent.hierarchies;
      const results = hierarchies
        .filter(
          (hierarchy) => showHistory || !isEndDateBeforeSelectedDay(hierarchy)
        )
        .filter(
          (hierarchy) => showFuture || !isStartDateAfterSelectedDay(hierarchy)
        );
      return {
        ...parent,
        hierarchies: results,
      };
    });

    const emptyHierarchiesFiltered = filteredByDate.filter(
      (parent) => parent.hierarchies.length > 0
    );

    return emptyHierarchiesFiltered;
  }, [data, selectedDay, showHistory, showFuture]);
};

export default useFilterUnitsByDate;
