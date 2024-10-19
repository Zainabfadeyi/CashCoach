import React from 'react'
import { Button, Dialog, DialogTitle, DialogContentText, DialogActions } from '@mui/material'
const DeleteMemo = ({ isOpen,
    onClose,
    onConfirm,
    transactionId,}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        onConfirm();
      };
return (
        <Dialog
          open={isOpen}
          onClose={onClose}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title" style={{ fontSize: '19px', color: 'red' }}>
            Delete Task
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContentText
              id="dialog-description"
              width={"400px"}
              style={{ fontSize: '18px', padding: '10px', marginLeft: '10px' }}
            >
              Are you sure you want to delete <span style={{ fontWeight: "600" }}>&quot;{(transactionId) || "this List"}&quot;?</span>
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={onClose}
                type="button"
                style={{
                  backgroundColor: '#f5f5f5',
                  fontSize: '10px',
                  color: 'black',
                  boxSizing: 'border-box',
                }}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                style={{
                  backgroundColor: '#DC4C3E',
                  fontSize: '10px',
                  color: 'white',
                  boxSizing: 'border-box',
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      );
    };
    
    export default DeleteMemo;