import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const UpdateModal = ({ isOpen, onClose, onUpdate, task }) => {
  const [updatedTask, setUpdatedTask] = useState(task.description);

  const handleInputChange = (e) => {
    setUpdatedTask(e.target.value);
  };

  const handleSave = () => {
    onUpdate(task.id, updatedTask);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Update Task"}</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          value={updatedTask}
          onChange={handleInputChange}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" size="small">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          autoFocus
          color="primary"
          size="small"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UpdateModal;
