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
;
import { Forum, Menu } from "@suid/icons-material";

export default function Home() {
  return (
    <>
    <Container sx={{textAlign: 'center'}}>
      <Forum sx={{fontSize: 300, color: "GrayText"}}/>
      <Typography variant="h4" color="GrayText">Select <Menu fontSize="large"/> to find any server/channel</Typography>
    </Container>
    </>
  );
}
