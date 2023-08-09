import React from 'react';
import { useSelector } from 'react-redux';

const useSelectedDate = () => {
  const selectedDate = useSelector((state) => state.dr.selectedDay);
  return selectedDate;
};

export default useSelectedDate;
