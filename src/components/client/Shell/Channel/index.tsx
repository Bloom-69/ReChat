import { ArrowBack } from "@suid/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@suid/material";
import { For } from "solid-js";

import * as ReChat from "../../../../lib/ReChat";

import { Markdown } from "../../../markdown";

async function getMessageFromChannel() {
  await ReChat.servers.current_channel?.messages.fetchMultiple({
    "include_users": true,
  }).then((messages) => ReChat.setMessages(messages.reverse()));
  ReChat.setServers("isHome", false);
}

export default function ChannelSidebar() {
  return (
    <div>
      <Drawer
        variant="temporary"
        anchor="left"
        open={ReChat.showChannelSidebar()}
        sx={{ zIndex: 9999 }}
      >
        <List disablePadding>
          <ListItem>
            <ListItemButton
              onClick={() => {
                ReChat.setShowChannelSidebar(false);
                ReChat.setShowServerSidebar(true);
              }}
            >
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              Back
            </ListItemButton>
          </ListItem>
          <For each={ReChat.servers.current_server?.orderedChannels}>
            {(category) => (
              <>
                <ListItem>
                  <ListItemText primary={category.name} />
                </ListItem>
                <For each={category.channels}>
                  {(channel) => (
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          ReChat.setServers("current_channel", channel);
                          getMessageFromChannel();
                          ReChat.setShowChannelSidebar(false);
                        }}
                      >
                        <Markdown content={channel.name} />
                      </ListItemButton>
                    </ListItem>
                  )}
                </For>
              </>
            )}
          </For>
        </List>
      </Drawer>
    </div>
  );
}
