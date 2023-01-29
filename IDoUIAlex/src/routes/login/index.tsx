import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";

export default function Login() {
  const [tabValue, setTabValue] = React.useState(0);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100vw", backgroundColor: "lightblue" }}
    >
      <Paper sx={{ width: "450px", height: "500px" }}>
        <Grid container direction="column" alignItems="center" sx={{ flex: "1 1 auto", padding: "20px" }}>
          <Typography sx={{ fontFamily: "roboto", fontWeight: 500, fontSize: "24px", color: "#212121" }}>
            Hello Alex!
          </Typography>
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 400,
              fontSize: "16px",
              color: "#212121",
              textAlign: "center",
              maxWidth: "90%",
              marginTop: "8px",
            }}
          >
            Remember when you said I wasn't full stack? Well here is the full stack challenge done over the weekend. For
            sure better than anything anybody has ever submitted including you. Enjoy this light blue background.
          </Typography>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ marginBottom: "20px", marginTop: "12px" }}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          {tabValue === 0 ? <LoginForm /> : <SignUpForm />}
        </Grid>
      </Paper>
    </Grid>
  );
}
