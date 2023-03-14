import * as React from 'react';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TextField = React.forwardRef((props, ref) => {
  const { onFocus, onBlur, helperText, ...other } = props;
  const maxLength = props.inputProps?.maxLength;

  const [visible, setVisible] = React.useState(false);

  return (
    <MuiTextField
      ref={ref}
      {...other}
      onFocus={(event) => {
        setVisible(true);
        onFocus && onFocus(event);
      }}
      onBlur={(event) => {
        setVisible(false);
        onBlur && onBlur(event);
      }}
      helperText={
        <Box
          component="span"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{helperText}</span>
          {visible && maxLength > 0 && (
            <span>{`${props.value.length} / ${maxLength}`}</span>
          )}
        </Box>
      }
    />
  );
});

TextField.displayName = 'TextField';

export default TextField;
