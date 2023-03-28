import React from 'react';
import { render, screen } from '../testUtils';
import IfAuthorized from '../../src/auth/IfAuthorized';
import { authActions } from '../../src/auth';

jest.mock('../../src/hooks/useCurrentUser', () => () => ({
  roles: ['ROLE_READER'],
}));

test('shows content when authorized', () => {
  render(
    <IfAuthorized action={authActions.nameAttributes.view}>
      authorized
    </IfAuthorized>
  );

  expect(screen.queryByText('authorized')).toBeInTheDocument();
});

test('hides content when unauthorized', () => {
  render(
    <IfAuthorized action={authActions.nameAttributes.edit}>
      authorized
    </IfAuthorized>
  );

  expect(screen.queryByText('authorized')).not.toBeInTheDocument();
});
