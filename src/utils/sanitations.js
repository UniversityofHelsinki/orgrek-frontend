export const attributeSanitation = (attributes) => {
  return attributes.filter(
    (attribute) => !(attribute.isNew && attribute.deleted)
  );
};
