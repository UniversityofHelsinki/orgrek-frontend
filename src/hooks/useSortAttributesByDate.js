const useSortAttributesByDate = (elems) => {
  if (!elems) {
    return [];
  }

  let result = [...elems];

  result.sort((a, b) => {
    return (
      (!(a.endDate || b.endDate) && 0) ||
      (!a.endDate && -1) ||
      (!b.endDate && 1) ||
      new Date(b.endDate) - new Date(a.endDate)
    );
  });

  return result;
};

export default useSortAttributesByDate;
