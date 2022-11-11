import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { confirmable } from 'react-confirm';

const Confirmation = ({
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  title = 'Confirmation',
  confirmation,
  show,
  proceed,
  dismiss,
  cancel,
  modal,
}) => {
  return (
    <div>
      <Dialog
        modal={modal}
        open={show}
        onClose={dismiss}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          {confirmation}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={cancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            onClick={proceed}
          >
            {okLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default confirmable(Confirmation);