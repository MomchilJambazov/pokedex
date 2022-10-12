import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// eslint-disable-next-line react/display-name
const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

interface Props {
  message: string,
  action?: JSX.Element,
  severity: 'success' | 'error' | undefined,
  open: boolean,
  setOpen: (open:boolean) => void,
}

const SnackbarAlert = ({
  message, action, severity, open, setOpen,
}:Props) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
        action={(
          <>
            {action}
            <IconButton onClick={handleClose} color="inherit" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackbarAlert.defaultProps = {
  action: null,
};

export default SnackbarAlert;
