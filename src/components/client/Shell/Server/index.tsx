import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@suid/material";

import * as ReChat from "../../../../lib/ReChat";

import { createSignal, For, Match, Switch } from "solid-js";

import type { Server } from "revkit";

import { revolt } from "../../../../lib/revolt";
import { Home as HomeIcon } from "@suid/icons-material";

export default function ServerSidebar() {
  const [serverlist, SetServerList] = createSignal<Server[]>([]);

  SetServerList(revolt.servers.items());
  return (
    <div>
      <Drawer
        anchor="left"
        open={ReChat.showServerSidebar()}
        onClose={() => ReChat.setShowServerSidebar(false)}
      >
        <List disablePadding>
          <ListItem>
            <ListItemButton
              sx={{ borderRadius: 1 }}
              onClick={() => {
                ReChat.setServers("current_server", undefined);
                ReChat.setServers("current_channel", undefined);
                ReChat.setServers("isHome", true);
                ReChat.setShowServerSidebar(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <For each={serverlist()}>
            {(server) => (
              <ListItem>
                <ListItemButton
                  sx={{ borderRadius: 1 }}
                  onClick={() => {
                    ReChat.setServers("current_server", server);
                    ReChat.setShowServerSidebar(false);
                    ReChat.setShowChannelSidebar(true);
                  }}
                >
                  <ListItemIcon>
                    <Switch>
                      <Match when={server.icon}>
                        <Avatar
                          src={server.generateIconURL()}
                          alt={server.name}
                          sx={{ width: 24, height: 24, background: "#e0e0e0" }}
                        >
                          {server.name.substring(0, 1)}
                        </Avatar>
                      </Match>
                    </Switch>
                  </ListItemIcon>
                  <ListItemText primary={server.name} />
                </ListItemButton>
              </ListItem>
            )}
          </For>
        </List>
      </Drawer>
    </div>
  );
}
