import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Stack, Switch } from '@mui/material';

const NodeViewControl = ({ node, onSwitchHistory, onSwitchFuture }) => {
  const { t } = useTranslation();
  const [showHistory, setShowHistory] = useState(false);
  const [showFuture, setShowFuture] = useState(false);

  const handleHistorySwitch = (event) => {
    setShowHistory(event.target.checked);
    if (onSwitchHistory) {
      onSwitchHistory(event.target.checked);
    }
  };

  const handleFutureSwitch = (event) => {
    setShowFuture(event.target.checked);
    if (onSwitchFuture) {
      onSwitchFuture(event.target.checked);
    }
  };

  if (!node) {
    return <></>;
  }

  const focusStyle = {
    '&:has(:focus-visible)': {
      outline: '2px solid #107eab',
      borderRadius: '3px',
    },
  };

  return (
    <Stack direction="row">
      <FormControlLabel
        label={t('show_history')}
        labelPlacement="start"
        sx={focusStyle}
        control={
          <Switch
            checked={showHistory}
            id="show_history_switch"
            onChange={handleHistorySwitch}
          />
        }
      ></FormControlLabel>
      <FormControlLabel
        label={t('show_coming')}
        labelPlacement="start"
        sx={focusStyle}
        control={
          <Switch
            checked={showFuture}
            id="show_future_switch"
            onChange={handleFutureSwitch}
          />
        }
      ></FormControlLabel>
    </Stack>
  );
};

export default NodeViewControl;
