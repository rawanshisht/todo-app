import { useState, useEffect } from "react";
import Todo from "./Todo";
import Error from "./Error";
import AddIcon from "@mui/icons-material/Add";
import {
  Stack,
  IconButton,
  Box,
  TextField,
  List,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Todos = () => {
  const [newTask, setNewTask] = useState("");
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setItemList(response.data.todos);
      setLoading(false);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (loading) {
      fetchData().then(() => setLoading(false));
    }
  }, [loading]);
  const handleAddTask = async () => {
    try {
      await axios
        .post("http://localhost:3000/todos", {
          description: newTask,
        })
        .then((res) => {
          setItemList((prevItemList) => [...prevItemList, res.data.todo]);
          setError(null);
          setNewTask("");
        });
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };
  const handleDeleteTask = (id) => {
    try {
      axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        setItemList((prevItemList) =>
          prevItemList.filter((task) => task._id !== id)
        );
        setError(null);
      });
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };
  const handleUpdate = async (id, checkbox, newDescription = null) => {
    try {
      setItemList((prevItemList) =>
        prevItemList.map((task) => {
          if (task._id === id) {
            if (checkbox) {
              return { ...task, done: !task.done };
            }
            return { ...task, description: newDescription };
          }
          return task;
        })
      );
      const updatedObj = itemList.find((task) => task._id === id);
      await axios.patch(`http://localhost:3000/todos/${id}`, updatedObj);
      setError(null);
    } catch (err) {
      setError(`Error occured. ${err.response.data.msg}`);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleAddTask();
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
          {error && <Error error={error} />}
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {itemList.map((todo) => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  onDelete={() => handleDeleteTask(todo._id)}
                  onUpdateTask={(id, updatedDescription) =>
                    handleUpdate(todo._id, false, updatedDescription)
                  }
                  handleChange={(id, updatedDescription) =>
                    handleUpdate(todo._id, true, updatedDescription)
                  }
                />
              ))}
            </List>
          )}
        </Stack>
      </Box>
    </>
  );
};
export default Todos;
