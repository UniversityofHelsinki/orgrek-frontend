import { isAuthorized } from '../../src/auth';

test.each([
  { roles: [], action: { allowRoles: ['ROLE_READER'] }, expected: false },
  {
    roles: ['ROLE_READER'],
    action: { allowRoles: ['ROLE_READER'] },
    expected: true,
  },
  {
    roles: ['ROLE_READER'],
    action: { allowRoles: [] },
    expected: false,
  },
  {
    roles: ['ROLE_READER'],
    action: { allowRoles: ['ROLE_ADMIN'] },
    expected: false,
  },
  {
    roles: ['ROLE_READER'],
    action: { allowRoles: ['ROLE_READER', 'ROLE_ADMIN'] },
    expected: true,
  },
  {
    roles: ['ROLE_READER', 'ROLE_ADMIN'],
    action: { allowRoles: ['ROLE_ADMIN'] },
    expected: true,
  },
  {
    roles: ['ROLE_READER', 'ROLE_ADMIN'],
    action: { allowRoles: ['ROLE_READER', 'ROLE_ADMIN'] },
    expected: true,
  },
])('is authorized %o', ({ roles, action, expected }) => {
  const user = { roles };
  expect(isAuthorized(user, action)).toBe(expected);
});
