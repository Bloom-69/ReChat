import { children, Component } from "solid-js";

import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@suid/material";
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@suid/icons-material";


import { revolt } from "../../../lib/revolt";
import * as ReChat from "../../../lib/ReChat";

import { Settings } from "../Settings";
import ServerSidebar from "./Server";
import ChannelSidebar from "./Channel";
import { Menu } from "./Menu";
import { Markdown } from "../../markdown";

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
            <Markdown content={ReChat.servers.current_channel?.name || "ReChat"} />
          </Typography>
          <IconButton onClick={() => ReChat.setShowSettings(true)}>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <Avatar
              src={revolt.user.generateAvatarURL() ||
                revolt.user.defaultAvatarURL}
              alt={revolt.user.username}
              onClick={(event) => {
                ReChat.setShowMenu(true);
                ReChat.setAnchorEl(event.currentTarget);
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Shell Components */}

      <ServerSidebar />
      <ChannelSidebar />
      <Settings />
      <Menu />

      {/* Shell's Nested Children */}

      {props.children}
    </div>
  );
};

export { Shell };
