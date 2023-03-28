import React from 'react';
import { render, screen } from '../testUtils';
import IfAdmin from '../../src/auth/IfAdmin';

const mockUser = {
  roles: [],
};

jest.mock('../../src/hooks/useCurrentUser', () => () => mockUser);

beforeEach(() => {
  mockUser.roles = [];
});

test('shows content when authorized', () => {
  mockUser.roles = ['ROLE_ADMIN'];

  render(<IfAdmin>authorized</IfAdmin>);

  expect(screen.queryByText('authorized')).toBeInTheDocument();
});

test('hides content when unauthorized', () => {
  render(<IfAdmin>authorized</IfAdmin>);

  expect(screen.queryByText('authorized')).not.toBeInTheDocument();
});
