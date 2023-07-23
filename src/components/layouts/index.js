import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./main/navbar";
import Drawer from "./main/drawer";
import useDrawer from "../../hooks/useDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import JWT from "../../utils/jwt";
import authTypes from "../../store/types/authTypes";

function Layouts(props) {
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => state);

  useEffect(() => {
    const {profile} = auth;
    if (!profile) {
      const _profiles = JWT.getProfile();
      dispatch({type: authTypes.SET_PROFILE, payload: _profiles});
    }
  }, [auth]);

  const { container, drawerWidth, mobileOpen, handleDrawerToggle } =
    useDrawer(props);
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Navbar 
        mobileOpen={mobileOpen}
        drawerWidth={mobileOpen ? 60 : drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Drawer
        drawerWidth={mobileOpen ? 60 : drawerWidth}
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container sx={{pt: 2}}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
};

export default Layouts;