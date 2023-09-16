import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

export default function ConfirmationDialog(props) {

  const { open, onClose, onConfirm, title, description } = props;

  return (
    <div>
      <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="cancel-popup"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          onClick={() => onClose()}
          className="btn pink-btn"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
          }}
          autoFocus
          className="btn green-btn"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}


// const ConfirmationDialog = (props) => {
  
//   return (
//     <Dialog
//       open={open}
//       onClose={() => onClose()}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//       className="cancel-popup"
//     >
//       <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-description">
//           {description}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           type="button"
//           onClick={() => onClose()}
//           className="btn pink-btn"
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={() => {
//             onConfirm();
//           }}
//           autoFocus
//           className="btn green-btn"
//         >
//           Ok
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;
