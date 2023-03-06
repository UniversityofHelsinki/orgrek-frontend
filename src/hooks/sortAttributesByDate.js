const sortNameAttributesByDate = (elems, order) => {
  let result = [];
  for (let property in order) {
    const filteredBatch = elems.filter((e) => {
      return e.key === property;
    });
    filteredBatch.sort((a, b) => {
      return (
        (!(a.endDate || b.endDate) && 0) ||
        (!a.endDate && -1) ||
        (!b.endDate && 1) ||
        new Date(b.endDate) - new Date(a.endDate)
      );
    });
    result.push(filteredBatch);
  }
  return result.flat();
};

const orderNameAttributesByLanguage = (elems) => {
  const order = { name_fi: 0, name_sv: 1, name_en: 2, default: 3 };
  elems.sort((a, b) => order[a.key] - order[b.key]);
  return sortNameAttributesByDate(elems, order);
};

export default orderNameAttributesByLanguage;
