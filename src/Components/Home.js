import React from "react";
import Todos from "./Todos";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Stack direction="column" justifyContent="center" spacing={2}>
        <Box
          style={{
            fontWeight: "bold",
            textAlign: "center",
            margin: "16px",
            display: "inline-block",
          }}
        >
          <Link to="/login">
            <Button variant="outlined" color="primary" size="small">
              Register/Login
            </Button>
          </Link>
        </Box>

        <Todos />
      </Stack>
    </>
  );
}

export default Home;
