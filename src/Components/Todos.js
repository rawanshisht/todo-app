import { useState } from "react";
import Todo from "./Todo";

const Todos = () => {
  const [newTask, setNewTask] = useState("");
  const [itemList, setItemList] = useState([
    {
      id: 1,
      description: "task 1 description",
    },
    {
      id: 2,
      description: "task 2 description",
    },
    {
      id: 3,
      description: "task 3 description",
    },
    {
      id: 4,
      description: "task 4 description",
    },
  ]);

  const handleAddTask = () => {
    if (newTask !== "") {
      const nextID = itemList[itemList.length - 1].id + 1;
      setItemList([...itemList, { id: nextID, description: newTask }]);
      setNewTask("");
    }
  };
  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };
  const handleDeleteTask = (id) => {
    const updatedList = itemList.filter((todo) => todo.id !== id);
    setItemList(updatedList);
  };
  const handleUpdateTask = (id, updatedDescription) => {
    const updatedList = itemList.map((task) =>
      task.id === id ? { ...task, description: updatedDescription } : task
    );
    setItemList(updatedList);
  };
  return (
    <>
      <div id="title">
        <h1>To Do List</h1>
      </div>
      <div id="content">
        <div id="addTaskSection">
          <input
            type="text"
            placeholder="Enter Your Task..."
            name="newTask"
            onChange={handleTaskInput}
            value={newTask}
          ></input>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div id="tasksList">
          <ul>
            {itemList.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={() => handleDeleteTask(todo.id)}
                onUpdateTask={(id, updatedDescription) =>
                  handleUpdateTask(todo.id, updatedDescription)
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Todos;
