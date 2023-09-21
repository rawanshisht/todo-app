import { useState, useEffect } from "react";
import Todo from "./Todo";
import AddIcon from "@mui/icons-material/Add";
import { Stack, IconButton, Box, TextField, List, Alert } from "@mui/material";
import axios from "axios";

const Todos = () => {
  const [newTask, setNewTask] = useState("");
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setItemList(response.data.todos);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:3000/todos", {
        description: newTask,
      });
      setNewTask("");
      fetchData();
      setError(null);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      fetchData();
      setError(null);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  const handleUpdateTask = async (id, updatedDescription) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        description: updatedDescription,
      });
      fetchData();
      setError(null);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  const handleChangeTask = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        done: !itemList.find((task) => task._id === id).done,
      });
      fetchData();
      setError(null);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
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
            onKeyDown={handleKeyDown}
          />

          <IconButton
            aria-label="add"
            color="primary"
            size="small"
            onClick={handleAddTask}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          {error && (
            <Alert
              variant="filled"
              severity="error"
              sx={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "1000",
              }}
            >
              {error}
            </Alert>
          )}
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
                key={todo._id}
                todo={todo}
                onDelete={() => handleDeleteTask(todo._id)}
                onUpdateTask={(id, updatedDescription) =>
                  handleUpdateTask(todo._id, updatedDescription)
                }
                handleChange={() => handleChangeTask(todo._id)}
              />
            ))}
          </List>
        </Stack>
      </Box>
    </>
  );
};
export default Todos;
