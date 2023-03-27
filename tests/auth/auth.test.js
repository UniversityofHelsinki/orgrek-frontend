import { isAdmin, isAuthorized } from '../../src/auth';

global.console = {
  error: jest.fn(),
};

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
])('isAuthorized %o', ({ roles, action, expected }) => {
  const user = { roles };
  expect(isAuthorized(user, action)).toBe(expected);
});

test('isAuthorized throws error if action is string', () => {
  const user = { roles: [] };
  expect(() => isAuthorized(user, 'invalid action')).toThrowError(
    'Expected action as object'
  );
});

test('isAuthorized throws error if allowRoles is undefined', () => {
  const user = { roles: [] };
  expect(() => isAuthorized(user, { allow: true })).toThrowError(
    'Action is missing allowRoles'
  );
});

test.each([
  { roles: [], expected: false },
  {
    roles: ['ROLE_READER'],
    expected: false,
  },
  {
    roles: ['ROLE_ADMIN'],
    expected: true,
  },
  {
    roles: ['ROLE_READER', 'ROLE_ADMIN'],
    expected: true,
  },
])('isAdmin %o', ({ roles, expected }) => {
  const user = { roles };
  expect(isAdmin(user)).toBe(expected);
});
