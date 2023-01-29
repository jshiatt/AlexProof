import React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "@mui/icons-material/LogoDev";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { useAuth } from "../../hooks/AuthProvider";

export default function PageContainer({ children }: { children: React.ReactNode }) {
  const { logout, creds } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLDivElement) | null>(null);
  const open = Boolean(anchorEl);
  return (
    <Grid container direction="column" style={{ flex: "1 1 auto" }} wrap="nowrap">
      <Grid container>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Logo fontSize="large" sx={{ color: "#212121", marginRight: "12px" }} />
            <Typography sx={{ color: "#212121" }}>Alex's Orders</Typography>
            <Grid sx={{ marginLeft: "auto" }}>
              <List component="nav">
                <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Typography sx={{ color: "#212121" }}>{creds.userName}</Typography>
                </ListItemButton>
              </List>
            </Grid>
          </Toolbar>
        </AppBar>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </Menu>
      </Grid>
      {children}
    </Grid>
  );
}
