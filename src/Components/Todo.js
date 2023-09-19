import { useState } from "react";
import UpdateModal from "./UpdateModal";

const Todo = (props) => {
  const { todo, onDelete, onUpdateTask } = props;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <div id="taskItem">
        <li key={todo.key}>
          {todo.description}
          <button id={todo.key} onClick={() => setIsUpdateModalOpen(true)}>
            Update
          </button>
          {isUpdateModalOpen && (
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              onUpdate={onUpdateTask}
              task={todo}
            />
          )}
          <button id={todo.key} onClick={onDelete}>
            Delete
          </button>
        </li>
      </div>
    </>
  );
};
export default Todo;
