import { useState } from "react";
import Todo from "./Todo";
import AddIcon from "@mui/icons-material/Add";
import { Stack, IconButton, Box, TextField, List } from "@mui/material";

const Todos = () => {
  const [newTask, setNewTask] = useState("");
  const [itemList, setItemList] = useState([
    {
      id: 1,
      description: "task 1 description",
      done: true,
    },
    {
      id: 2,
      description: "task 2 description",
      done: false,
    },
    {
      id: 3,
      description: "task 3 description",
      done: false,
    },
    {
      id: 4,
      description: "task 4 description",
      done: false,
    },
  ]);

  const handleAddTask = () => {
    if (newTask !== "") {
      const nextID = itemList[itemList.length - 1].id + 1;
      setItemList([
        ...itemList,
        { id: nextID, description: newTask, done: false },
      ]);
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
  const handleChangeTask = (id) => {
    const updatedList = itemList.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setItemList(updatedList);
  };
  return (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          spacing={2}
        >
          <TextField
            id="standard-basic"
            label="What do you want to do?"
            variant="standard"
            onChange={handleTaskInput}
            value={newTask}
          />
          <IconButton
            aria-label="add"
            color="primary"
            size="small"
            onClick={handleAddTask}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {itemList.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={() => handleDeleteTask(todo.id)}
                onUpdateTask={(id, updatedDescription) =>
                  handleUpdateTask(todo.id, updatedDescription)
                }
                handleChange={() => handleChangeTask(todo.id)}
              />
            ))}
          </List>
        </Stack>
      </Box>
    </>
  );
};
export default Todos;
