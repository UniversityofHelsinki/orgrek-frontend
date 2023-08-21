export const stringComparator = (a, b) => {
  const upA = (a && a.toUpperCase()) || '';
  const upB = (b && b.toUpperCase()) || '';
  if (upA < upB) {
    return -1;
  } else if (upA > upB) {
    return 1;
  }
  return 0;
};

export const valueComparator = (valueFn) => {
  return (a, b) => {
    return stringComparator(valueFn(a), valueFn(b));
  };
};

const fieldComparator = (field) => {
  return (a, b) => {
    return stringComparator(a[field], b[field]);
  };
};

export default fieldComparator;
