import { Alert } from "@mui/material";

const Error = ({ error }) => {
  return (
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
  );
};
export default Error;
