import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Tooltip,
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";

function Navbar(props) {
  const { auth } = useSelector((state) => state);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
        background: 'white',
        color: 'black'
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" noWrap component="div">
            {/* {auth?.profile?.role === 2 ? "ADMIN" : "PEGAWAI"} */}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Tooltip title="See Profiles">
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Avatar alt="Remy Sharp" />
              <Box sx={{ ml: 1 }}>
                <Box component="h5" sx={{ my: 0 }}>
                  {auth?.profile?.full_name}
                </Box>
                <Box component="span">
                  {auth?.profile?.role === 2 ? "ADMIN" : "PEGAWAI"}
                </Box>
              </Box>
            </Box>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;