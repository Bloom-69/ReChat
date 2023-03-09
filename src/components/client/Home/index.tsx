import {
  Alert,
  Avatar,
  Badge,
  Chip,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@suid/material";

import type { User } from "revolt-toolset";

import { revolt } from "../../../lib/revolt";

import { createSignal, For, Match, Show, Switch } from "solid-js";
import { Forum, Menu } from "@suid/icons-material";

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
    <Container sx={{textAlign: 'center'}}>
      <Forum sx={{fontSize: 350, color: "GrayText"}}/>
      <Typography variant="h3" color="GrayText">Select <Menu fontSize="large"/> to find any server/channel</Typography>
    </Container>
    </>
  );
}
