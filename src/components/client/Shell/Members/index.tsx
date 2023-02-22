import {
  Avatar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@suid/material";

import * as ReChat from "../../../../lib/ReChat";

import { createSignal, For, Match, Switch } from "solid-js";

import type { User } from "revolt-toolset";

import { revolt } from "../../../../lib/revolt";

export default function MemberSidebar() {
  const [memberlist, SetMemberList] = createSignal<User[]>([]);

  SetMemberList(revolt.users.items());
  return (
    <div>
      <Drawer
        variant="temporary"
        onClose={() => ReChat.setShowMembers(false)}
        anchor="right"
        open={ReChat.showMembers()}
        sx={{
          position: "sticky",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemText primary="Users" />
          </ListItem>
          <For each={memberlist()}>
            {(member) => (
              <ListItem>
                <ListItemIcon>
                  <Switch>
                    <Match when={member.avatar}>
                      <Avatar
                        src={member.generateAvatarURL()}
                        alt={member.username}
                        sx={{ background: "#e0e0e0" }}
                      />
                    </Match>
                  </Switch>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      {member.username} {<Chip size="small" label={member.relationship || "User"} />}
                    </>
                  }
                  secondary={member.status}
                />
              </ListItem>
            )}
          </For>
        </List>
      </Drawer>
    </div>
  );
}
