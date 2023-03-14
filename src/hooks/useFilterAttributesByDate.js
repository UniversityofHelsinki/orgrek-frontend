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
const useFilterAttributesByDate = (data) => {
  const { selectedDay, showHistory, showComing } = useSelector((state) => ({
    selectedDay: state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing,
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
    return (data || [])
      .filter((item) => showHistory || !isEndDateBeforeSelectedDay(item))
      .filter((item) => showComing || !isStartDateAfterSelectedDay(item));
  }, [data, selectedDay, showHistory, showComing]);
};

export default useFilterAttributesByDate;
