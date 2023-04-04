import React from 'react';
import NotificationComponent from '../../components/Notification';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store';
import { withMockStore } from '../../mockStore';
import Stack from '@mui/material/Stack';

export default {
  component: NotificationComponent,
};

export const Notification = {
  args: {
    message:
      'Morbi sollicitudin purus vitae enim placerat, et lacinia dolor finibus.',
  },
  render: ({ message }) => {
    const dispatch = useDispatch();

    const show = (severity) => {
      dispatch(showNotification({ message, severity }));
    };

    return (
      <>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => show('info')}>
            Show info
          </Button>
          <Button variant="outlined" onClick={() => show('success')}>
            Show success
          </Button>
          <Button variant="outlined" onClick={() => show('warning')}>
            Show warning
          </Button>
          <Button variant="outlined" onClick={() => show('error')}>
            Show error
          </Button>
        </Stack>
        <NotificationComponent />
      </>
    );
  },
  decorators: [withMockStore()],
};
