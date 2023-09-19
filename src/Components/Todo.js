import {
  Checkbox,
  FormControlLabel,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const Todo = (props) => {
  const { todo, onDelete, onUpdateTask, handleChange } = props;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <ListItem>
        <Checkbox key={todo.key} checked={todo.done} onChange={handleChange} />
        <ListItemText primary={todo.description} secondary="Jan 9, 2014" />
        <IconButton
          aria-label="edit"
          color="primary"
          size="small"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          size="small"
          onClick={onDelete}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItem>
      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={onUpdateTask}
          task={todo}
        />
      )}
    </>
  );
};
export default Todo;