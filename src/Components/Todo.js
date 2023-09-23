import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const Todo = (props) => {
  const { todo, onDelete, onUpdateTask } = props;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <ListItem key={todo.key}>
        <Checkbox
          key={todo.key}
          checked={todo.done}
          onChange={() => onUpdateTask(todo._id, true)}
        />
        <ListItemText primary={todo.description} secondary={todo.date} />
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
