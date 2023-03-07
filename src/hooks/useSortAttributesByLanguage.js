const useSortAttributesByLanguage = (elems) => {
  const result = [...elems];
  const order = { name_fi: 0, name_sv: 1, name_en: 2, default: 3 };
  result.sort((a, b) => order[a.key] - order[b.key]);
  return result;
};

export default useSortAttributesByLanguage;
