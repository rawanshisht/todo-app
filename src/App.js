import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./Components/UserLogin";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
function App() {
  return (
    <>
      <Router>
        <Typography
          variant="h3"
          gutterBottom
          style={{ fontWeight: "bold", textAlign: "center", margin: "16px" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            To Do App
          </Link>
        </Typography>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
