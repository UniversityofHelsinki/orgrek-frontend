const useSortAttributesByDate = (elems) => {
  let result = [];
  elems.sort((a, b) => {
    return (
      (!(a.endDate || b.endDate) && 0) ||
      (!a.endDate && -1) ||
      (!b.endDate && 1) ||
      new Date(b.endDate) - new Date(a.endDate)
    );
  });
  result.push(elems);
  return result.flat();
};

export default useSortAttributesByDate;
