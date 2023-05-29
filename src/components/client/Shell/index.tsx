import { Component, JSX, Show } from "solid-js";

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
  Info,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@suid/icons-material";

import { revolt } from "../../../lib/revolt";
import * as ReChat from "../../../lib/ReChat";

import { Settings } from "../Settings";
import ServerSidebar from "./Server";
import ChannelSidebar from "./Channel";
import { Menu } from "./Menu";
import ServerInfo from "./ServerInfo";
import TourShell from "./Tour";

const Shell = (props: any) => {
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
          <IconButton
            color="inherit"
            onClick={() => ReChat.setShowInfo(true)}
          >
            <Info/>
          </IconButton>
          <Typography
            sx={{ mx: 'auto', textAlign: 'center', flexGrow: 1 }}
            variant="h6"
            color="inherit"
            component="div"
          >
            {ReChat.servers.current_server?.name || "ReChat"} - {ReChat.servers.current_channel?.name || "Home"}
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
      <ServerInfo/>

      {/* Tour */}

      <TourShell/>

      {/* Shell's Nested Children */}
      {props.children}
    </div>
  );
};

export { Shell };
