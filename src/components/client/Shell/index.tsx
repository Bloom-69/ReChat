import { children, Component } from "solid-js";

import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@suid/material";
import { Menu as MenuIcon, Settings } from "@suid/icons-material";
import { revolt } from "../../../lib/revolt";
import * as ReChat from "../../../lib/ReChat";
import ServerSidebar from "./Server";
import ChannelSidebar from "./Channel";
import { Menu } from "./Menu";

const Shell: Component = (props: any) => {
  return (
    <div>
      <AppBar position="sticky" variant="outlined" color="inherit">
        <Toolbar variant="dense">
          <IconButton
            onClick={() => {
              ReChat.setShowServerSidebar(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{ marginLeft: 1, flexGrow: 1 }}
            variant="h6"
            color="inherit"
            component="div"
          >
            ReChat
          </Typography>
          <IconButton onClick={() => ReChat.setShowSettings(true)}>
            <Settings />
          </IconButton>
          <IconButton>
            <Avatar src="./broken.png" alt={revolt.user.username} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Shell Components */}
      
      <ServerSidebar />
      <ChannelSidebar />
      <Menu/>
      
      {/* Shell's Nested Children */}
      
      {props.children}
    </div>
  );
};

export { Shell };
