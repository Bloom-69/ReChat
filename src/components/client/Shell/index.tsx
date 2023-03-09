import { Component, Show } from "solid-js";

import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@suid/material";
import {
  Group,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@suid/icons-material";

import { revolt } from "../../../lib/revolt";
import * as ReChat from "../../../lib/ReChat";

import { Settings } from "../Settings";
import ServerSidebar from "./Server";
import ChannelSidebar from "./Channel";
import { Menu } from "./Menu";

const Shell: Component = (props: any) => {
  return (
    <div>
      <AppBar
        position="sticky"
        variant={ReChat.settings.appearance.appbar_vairant}
      >
        <Toolbar>
          <IconButton
            color="inherit"
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
            {ReChat.servers.current_channel?.name || "ReChat"}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => ReChat.setShowSettings(true)}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => {
              ReChat.setShowMembers(true);
            }}
          >
            <Group />
          </IconButton>
          <IconButton>
            <Avatar
              sx={{ width: 24, height: 24 }}
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
