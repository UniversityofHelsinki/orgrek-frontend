import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dismissNotification } from '../store';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * Displays notifications in a MUI Snackbar.
 *
 * Dispatch showNotification action to show the snackbar.
 * Only one snackbar should be present at a time, so the previous one is closed
 * when a new notification is dispatched.
 */
const Notification = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const { queue } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (queue.length > 0 && !current) {
      const next = queue[0];
      setCurrent(next);
      dispatch(dismissNotification(next));
      setOpen(true);
    } else if (queue.length > 0 && current && open) {
      setOpen(false);
    }
  }, [queue, current, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setCurrent(null);
  };

  return (
    <Snackbar
      key={current?.key}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        severity={current?.severity}
        action={
          <IconButton
            size="small"
            aria-label={t('notification.close')}
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {current?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
