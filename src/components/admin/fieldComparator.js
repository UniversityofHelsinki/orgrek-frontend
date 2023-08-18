const fieldComparator = (field) => {
  return (a, b) => {
    if (a[field]) {
      return a[field].localeCompare(b[field]);
    }
    return 1;
  };
};

export default fieldComparator;
