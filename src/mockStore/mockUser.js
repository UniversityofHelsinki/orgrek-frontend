export const createReader = (value = {}) => ({
  eppn: 'user',
  hyGroupCn: [],
  preferredLanguage: 'fi',
  displayName: '',
  roles: ['ROLE_READER'],
  ...value,
});

export const createAdmin = (value = {}) => ({
  eppn: 'admin',
  hyGroupCn: ['grp-orgrek-role-admin'],
  preferredLanguage: 'fi',
  displayName: '',
  roles: ['ROLE_READER', 'ROLE_ADMIN'],
  ...value,
});
