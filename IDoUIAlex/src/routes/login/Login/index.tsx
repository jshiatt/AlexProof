import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../../../hooks/AuthProvider";

export default function LoginForm() {
  const { login, loginLoading, creds, setCreds } = useAuth();

  return (
    <Grid container direction="column" alignItems="center">
      {loginLoading ? (
        <>
          <Skeleton height="56px" width="210px" animation="wave" style={{ marginBottom: "12px" }} />
          <Skeleton height="56px" width="210px" animation="wave" style={{ marginBottom: "12px" }} />
          <Skeleton height="56px" width="210px" animation="wave" style={{ marginBottom: "12px" }} />
        </>
      ) : (
        <>
          <TextField
            variant="outlined"
            label="Username"
            required
            value={creds.userName || ""}
            placeholder="Enter"
            onChange={(e) => setCreds((prev) => ({ ...prev, userName: e.target.value }))}
            sx={{ marginBottom: "12px" }}
          />
          <TextField
            variant="outlined"
            label="Password"
            required
            type="password"
            value={creds.password || ""}
            placeholder="Enter"
            onChange={(e) => setCreds((prev) => ({ ...prev, password: e.target.value }))}
            sx={{ marginBottom: "12px" }}
          />
          <Button variant="contained" color="primary" onClick={() => login()}>
            Login
          </Button>
        </>
      )}
    </Grid>
  );
}
