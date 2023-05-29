import { ArrowBack, Speaker, SpeakerPhone, Tag, VolumeUp, } from "@suid/icons-material";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@suid/material";
import { ChannelType } from "revkit";
import { For } from "solid-js";

import * as ReChat from "../../../../lib/ReChat";

import { Markdown } from "../../../markdown";

async function getMessageFromChannel() {
  await ReChat.servers.current_channel?.messages.fetchMultiple({
    "include_users": true,
  }).then((messages) => ReChat.setMessages(messages.reverse()));
  ReChat.setServers("isHome", false);
}

function Voice() {
  return (
    <>
      <VolumeUp />
    </>
  );
}

function Channel() {
  return <Tag />;
}

export default function ChannelSidebar() {
  return (
    <div>
      <Drawer
        anchor="left"
        open={ReChat.showChannelSidebar()}
        sx={{ zIndex: 9999 }}
      >
        <List disablePadding>
          <ListItem>
            <ListItemButton
              sx={{ borderRadius: 1 }}
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
                        sx={{ borderRadius: 1 }}
                        onClick={() => {
                          ReChat.setServers("current_channel", channel);
                          getMessageFromChannel();
                          ReChat.setShowChannelSidebar(false);
                        }}
                      >
                        <ListItemIcon>
                          {channel.type === ChannelType.Voice && Voice()}
                          {channel.icon && <Avatar variant="square" sx={{width: 24, height: 24}} src={channel.generateIconURL()}/>}
                          {!channel.icon && channel.type !== ChannelType.Voice && Channel()}
                        </ListItemIcon>
                        <ListItemText
                          primary={<Markdown content={channel.name} />}
                          secondary={channel.description}
                        />
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
