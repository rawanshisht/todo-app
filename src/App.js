import "./App.css";
import Todos from "./Components/Todos";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        style={{ fontWeight: "bold", textAlign: "center", margin: "16px" }}
      >
        To Do App
      </Typography>
      <Todos />
    </>
  );
}

export default App;
