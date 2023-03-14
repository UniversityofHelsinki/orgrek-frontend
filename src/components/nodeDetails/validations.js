export const valueNotEmpty = (values) => {
  const errors = {};

  [...values.nameFi, ...values.nameSv, ...values.nameEn].forEach((value) => {
    if (!value.value.trim()) {
      if (!errors.valueNotEmpty) {
        errors.valueNotEmpty = {};
      }

      errors.valueNotEmpty[value.id] = true;
    }
  });

  return errors;
};
