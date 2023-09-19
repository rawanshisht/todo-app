import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Task Modal"
    >
      <h2>Update Task</h2>
      <input type="text" value={updatedTask} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};
export default UpdateModal;
