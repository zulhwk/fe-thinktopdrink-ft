import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  ListItemButton,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "./menu";
import { useSelector } from "react-redux";

function DrawerApp(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const urlPath = pathname.split("/");
  const [open, setOpen] = React.useState(false);
  const {auth} = useSelector((state) => state);

  const isAdmin = React.useMemo(() => {
    return auth?.profile?.role === 2 ? true : false;
  }, [auth]);

  const FilterMenu = React.useMemo(() => {
    if (isAdmin) return Menu;
    return Menu.filter(el => el?.isAdmin === false);
  }, [auth]);

  const handleClick = () => {
    setOpen(!open);
  };

  const styleBoxMenu = (pathName) => {
    return {
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: "10px",
      marginLeft: "2px",
      paddingLeft: 2,
      paddingRight: props.mobileOpen ? "40px" : 2,
      paddingTop: "4px",
      paddingBottom: "4px",
      backgroundColor: pathName ? "#3E79BA" : "",
    };
  };

  const openMenu = (path) => {
    handleClick();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const drawer = (
    <div>
      <Toolbar sx={{ my: props.mobileOpen ? 0 : 4, mx: 5 }}>
        {!props.mobileOpen && (
          // <img
          //   src={
          //     "https://pngimage.net/wp-content/uploads/2018/06/sun-png-logo-.png"
          //   }
          //   alt="Logo-Thinktop"
          //   style={{ width: "100%" }}
          // />
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h4>LOGO</h4>
          </div>
        )}
        {props.mobileOpen && <Typography>NT</Typography>}
      </Toolbar>
      <List>
        {FilterMenu.map((text, index) => (
          <div key={index}>
            <ListItem
              onClick={() =>
                text.children ? openMenu(text.path) : navigate(`${text.path}`)
              }
              button
              key={text.title}
              sx={{ paddingLeft: 0 }}
            >
              <Box
                component="div"
                sx={styleBoxMenu(text.parent === urlPath[2])}
              >
                <ListItemIcon>{text.icon}</ListItemIcon>
                {props.mobileOpen ? null : (
                  <ListItemText primary={text.title} />
                )}
                {text.children && (open ? <ExpandLess /> : <ExpandMore />)}
              </Box>
            </ListItem>
            {text.children && (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {text.children.map((dataChildren, keyChildren) => (
                    <Box
                      key={keyChildren}
                      component="div"
                      onClick={() => navigate(`${dataChildren.path}`)}
                      sx={{
                        background:
                          urlPath[3] === dataChildren.parent ? "#062F5E" : "",
                      }}
                    >
                      <ListItemButton sx={{ pl: 4 }} key={keyChildren}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={dataChildren.title} />
                      </ListItemButton>
                    </Box>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
        <ListItem sx={{ paddingLeft: 0, cursor: "pointer" }}>
          <Box
            component="div"
            sx={styleBoxMenu(false)}
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {props.mobileOpen ? null : <ListItemText primary={"Logout"} />}
          </Box>
        </ListItem>
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={props.container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default DrawerApp;
