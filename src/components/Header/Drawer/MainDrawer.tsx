import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Divider,
  IconButton,
  List,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import MobileDrawer from "./MobileDrawer";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)})`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)})`,
  },
});
let swipe: boolean = false;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  ...(swipe && {
    width: `calc(${theme.spacing(7)})`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(9)})`,
    },
  })
}));
interface MainDrawerTS {
  isDrawerOpen: boolean
  drawerClose: ()=>void
  drawerOpen: ()=>void
  swipeableDrawer: boolean
}
const MainDrawer:React.FC<MainDrawerTS>=({
  isDrawerOpen,
  drawerClose,
  drawerOpen,
  swipeableDrawer,
})=> {
  const mobile = useMediaQuery("(min-width:600px)");
  swipe = swipeableDrawer;

  const handleDrawerClickClose = ()=>{
    if (swipeableDrawer) {
      drawerClose()
    }
    
  }

  return (
    <React.Fragment>
      {mobile ? (
        <Drawer variant="permanent" open={isDrawerOpen} >
         
          <List onClick={handleDrawerClickClose} >
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text} >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <List onClick={handleDrawerClickClose}>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <IconButton
            onClick={isDrawerOpen ? drawerClose : drawerOpen}
            style={{ marginTop: "auto", marginLeft: "auto", width: "auto" }}
          >
            {!isDrawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Drawer>
      ) : (
        <MobileDrawer open={isDrawerOpen} drawerClose={drawerClose}/>
      )}
    </React.Fragment>
  );
}

export default MainDrawer;
