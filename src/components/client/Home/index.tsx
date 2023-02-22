import {
  Alert,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
} from "@suid/material";

import type { User } from "revolt-toolset";

import { revolt } from "../../../lib/revolt";

import { createSignal, For, Match, Show, Switch } from "solid-js";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export default function Home() {
  const [userlist, SetUserList] = createSignal<User[]>([]);

  SetUserList(revolt.users.items());
  return (
    <>
      <Show when={window.location.hostname.includes("localhost")}>
        <Drawer
          open={true}
          variant="permanent"
          sx={{
            position: "sticky",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Alert severity="warning">Work in progress...</Alert>
          <List>
            <ListItem>
              <ListItemText primary="Direct Messages" />
            </ListItem>
            <For each={userlist()}>
              {(member) => (
                <ListItem>
                  <ListItemButton sx={{ width: "auto" }}>
                    <ListItemAvatar>
                      <Switch>
                        <Match when={member.avatar}>
                          <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            <Avatar
                              src={member.generateAvatarURL()}
                              alt={member.username}
                              sx={{
                                width: 24,
                                height: 24,
                                background: "#e0e0e0",
                              }}
                            />
                          </StyledBadge>
                        </Match>
                      </Switch>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ width: "auto", textOverflow: "ellipsis" }}
                      primary={member.username}
                      secondary={member.status}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </For>
          </List>
        </Drawer>
      </Show>
    </>
  );
}
