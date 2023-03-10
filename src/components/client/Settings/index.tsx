import {
  Alert,
  AppBar,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slide,
  Switch as SwitchMUI,
  TextField,
  Toolbar,
  Typography,
} from "@suid/material";

import { TransitionProps } from "@suid/material/transitions/transition";

import {
  Apps,
  ArrowBack,
  BorderAllRounded,
  Circle,
  Close as CloseIcon,
  DnsOutlined,
  EmojiEmotions,
  Face,
  FormatPaint,
  Gif,
  Image,
  Info,
  Person,
  Science,
  Tune,
  Window,
} from "@suid/icons-material";

import {
  Component,
  createSignal,
  For,
  JSXElement,
  Match,
  Show,
  Switch,
} from "solid-js";

import * as ReChat from "../../../lib/ReChat";
import { Index } from "unist-util-visit";
import { revolt } from "../../../lib/revolt";

const Transition = function Transition(
  props: TransitionProps & {
    children: JSXElement;
  },
) {
  return <Slide direction="up" {...props} />;
};

function updateStatus(
  mode?: "Online" | "Focus" | "Idle" | "Busy" | "Invisible" | null | undefined,
  status?: string,
) {
  if (mode && status) {
    revolt.api.patch("/users/@me", {
      status: {
        presence: mode,
        text: status,
      },
    });
  } else {
    revolt.api.patch("/users/@me", {
      status: {
        presence: ReChat.settings.status || revolt.user?.presence,
        text: ReChat.settings.statusText || revolt.user?.status,
      },
    });
  }
}

const [Tab, setTab] = createSignal<Index>(0);

const Settings: Component = () => {
  return (
    <Dialog
      fullScreen
      open={ReChat.showSettings()}
      onClose={() => ReChat.setShowSettings(false)}
      TransitionComponent={Transition}
    >
      <AppBar
        variant={ReChat.settings.appearance.appbar_vairant}
        position="static"
        sx={{ position: "relative" }}
      >
        <Toolbar>
          <Switch>
            <Match when={Tab() === 0}>
              <IconButton
                edge="start"
                sx={{marginLeft: 'auto'}}
                color="inherit"
                onClick={() => ReChat.setShowSettings(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Match>
            <Match when={Tab() !== 0}>
              <IconButton
                edge="start"
                sx={{marginLeft: 'auto'}}
                color="inherit"
                onClick={() => setTab(0)}
                aria-label="close"
              >
                <ArrowBack />
              </IconButton>
            </Match>
          </Switch>
          <Typography
            sx={{
              ml: 2,
              flex: 1,
            }}
            variant="h6"
            component="div"
          >
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Match when={Tab() === 0}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => setTab(1)}>
                <ListItemIcon>
                  <Tune />
                </ListItemIcon>
                <ListItemText
                  primary="ReChat Settings"
                  secondary="Client Settings"
                />
              </ListItemButton>
            </ListItem>
            {ReChat.settings.experiments.app_appearance && (
              <ListItem>
                <ListItemButton onClick={() => setTab(2)}>
                  <ListItemIcon>
                    <FormatPaint />
                  </ListItemIcon>
                  <ListItemText
                    primary="Appearance"
                    secondary="Customize ReChat"
                  />
                </ListItemButton>
              </ListItem>
            )}
            {ReChat.settings.experiments.nick && (
              <ListItem>
                <ListItemButton onClick={() => setTab(3)}>
                  <ListItemIcon>
                    <DnsOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary="Server-Wide Settings"
                    secondary="Change your server profile"
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem>
              <ListItemButton onClick={() => setTab(4)}>
                <ListItemIcon>
                  <Science />
                </ListItemIcon>
                <ListItemText
                  primary="Experiments"
                  secondary="Experimental Features"
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => setTab(5)}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText
                  primary="About ReChat"
                  secondary="Information about ReChat"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Match>
        <Match when={Tab() === 1}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Image />
              </ListItemIcon>
              <ListItemText
                primary="Show Attachments"
                secondary="Shows attachments like Images, Video and Audio.  Disabling Attachments might save bandwitdh, useful when mobile data"
              />
              <SwitchMUI
                value={ReChat.settings.showMedia}
                checked={ReChat.settings.showMedia}
                onChange={() => {
                  ReChat.settings.showMedia
                    ? ReChat.setSettings("showMedia", false)
                    : ReChat.setSettings("showMedia", true);
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary="Status"
                secondary="Change Status like Online, Focus, Busy, Idle and Offline"
              />
              <FormControl>
                <Select
                  variant="standard"
                  id="rechat-status-select"
                  value={ReChat.settings.status}
                  onChange={(e) => {
                    ReChat.setSettings("status", e.target.value);
                    updateStatus(e.target.value);
                  }}
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Focus">Focus</MenuItem>
                  <MenuItem value="Busy">Busy</MenuItem>
                  <MenuItem value="Idle">Idle</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Match>
        {ReChat.settings.experiments.app_appearance &&
          (
            <Match when={Tab() === 2}>
              <Alert severity="warning">
                Changing Colors and some component might requires client restart
              </Alert>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Circle
                      sx={{ color: ReChat.settings.appearance.primary_color }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Primary Color"
                    secondary="It changes the appbar and some components (Default: #2196f3)"
                  />
                  <TextField
                    variant="standard"
                    value={ReChat.settings.appearance.primary_color}
                    onChange={(e) =>
                      ReChat.setSettings(
                        "appearance",
                        "primary_color",
                        e.target.value,
                      )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEmotions />
                  </ListItemIcon>
                  <ListItemText
                    primary="Emoji"
                    secondary="Changing emoji requires refetch the message to see the effects (Default: Noto Emoji)"
                  />
                  <FormControl>
                    <Select
                      variant="standard"
                      id="rechat-appbar_variant-select"
                      value={ReChat.settings.emoji}
                      onChange={(e) => {
                        ReChat.setSettings(
                          "emoji",
                          e.target.value,
                        );
                      }}
                    >
                      <MenuItem value="mutant">
                        Mutant Remix (By Revolt)
                      </MenuItem>
                      <MenuItem value="twemoji">
                        Twemoji (By Twitter)
                      </MenuItem>
                      <MenuItem value="noto">Noto Emoji (By Google)</MenuItem>
                      <MenuItem value="fluent-3d">
                        Fluent 3D (By Microsoft)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Apps />
                  </ListItemIcon>
                  <ListItemText
                    primary="AppBar Variants"
                    secondary="Changes how the appbar looks (Default: Outlined)"
                  />
                  <FormControl>
                    <Select
                      variant="standard"
                      id="rechat-appbar_variant-select"
                      value={ReChat.settings.appearance.appbar_vairant}
                      onChange={(e) => {
                        ReChat.setSettings(
                          "appearance",
                          "appbar_vairant",
                          e.target.value,
                        );
                      }}
                    >
                      <MenuItem value="elevation">Elevation</MenuItem>
                      <MenuItem value="outlined">Outlined</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Match>
          )}
        <Match when={Tab() === 3}>
          <Alert severity="info">Work in progress</Alert>
          <List>
            <ListItem>
              <ListItemText
                primary="Current Server:"
                secondary={ReChat.servers.current_server?.name ||
                  "You aren't in this server!"}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {ReChat.servers.current_channel?.name.substring(0, 1) ||
                    revolt.user.username.substring(0, 1)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Profile Image" />
              <Button>
                Change Image
              </Button>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Current Username"
                secondary={ReChat.servers.current_server?.me?.nickname ||
                  revolt.user.username}
              />
              <TextField
                label="New Username"
                variant="standard"
                value={ReChat.nickname() || ""}
                onChange={(e) => ReChat.setNickname(e.currentTarget.value)}
              />
            </ListItem>
          </List>
        </Match>
        <Match when={Tab() === 4}>
          <Alert severity="warning">
            Some Experiments can cause ReChat more unstable (I think it will be
            """"""stable"""""")
          </Alert>
          <List>
            <ListItem>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText
                primary="Emoji Picker"
                secondary="Enable emoji picker (Early Work in Progress)"
              />
              <SwitchMUI
                value={ReChat.settings.experiments.picker}
                checked={ReChat.settings.experiments.picker}
                onChange={() => {
                  ReChat.settings.experiments.picker
                    ? ReChat.setSettings("experiments", "picker", false)
                    : ReChat.setSettings("experiments", "picker", true);
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Gif />
              </ListItemIcon>
              <ListItemText
                primary="GifBox"
                secondary="Enable GifBox support and Picker (Disabled due of Internal Server Error)"
              />
              <SwitchMUI
                disabled
                value={ReChat.settings.experiments.gifbox}
                checked={ReChat.settings.experiments.gifbox}
                onChange={() => {
                  ReChat.settings.experiments.gifbox
                    ? ReChat.setSettings("experiments", "gifbox", false)
                    : ReChat.setSettings("experiments", "gifbox", true);
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DnsOutlined />
              </ListItemIcon>
              <ListItemText
                primary="Server-Wide Profile"
                secondary="Enable Server-Wide Settings"
              />
              <SwitchMUI
                value={ReChat.settings.experiments.nick}
                checked={ReChat.settings.experiments.nick}
                onChange={() => {
                  ReChat.settings.experiments.nick
                    ? ReChat.setSettings("experiments", "nick", false)
                    : ReChat.setSettings("experiments", "nick", true);
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Window />
              </ListItemIcon>
              <ListItemText
                primary="Appearance"
                secondary="Customize your client (WIP)"
              />
              <SwitchMUI
                value={ReChat.settings.experiments.app_appearance}
                checked={ReChat.settings.experiments.app_appearance}
                onChange={() => {
                  ReChat.settings.experiments.app_appearance
                    ? ReChat.setSettings("experiments", "app_appearance", false)
                    : ReChat.setSettings("experiments", "app_appearance", true);
                }}
              />
            </ListItem>
          </List>
        </Match>
        <Match when={Tab() === 5}>
          <Container sx={{ marginTop: 1 }}>
            <Card>
                <CardHeader title="ReChat (In-Dev)" subheader="Version 0.3 (Codename: Unknow)" />
              <CardContent>
                <p>Made by Bloom#9014 (@Bloom in revolt)</p>

                <p>
                  This client was made using Solidjs and SUID (Material UI
                  ported into Solidjs)
                </p>
              </CardContent>
            </Card>
            <Card sx={{ marginTop: 1 }}>
              <CardHeader title="Browser Information" />
              <CardContent>
                <code>User Agent: {window.navigator.userAgent}</code>
              </CardContent>
            </Card>
            <Card sx={{ marginTop: 1 }}>
              <CardHeader title="System Information" />
              <CardContent>
                <code>Platform: {window.navigator.platform}</code>{" "}
                <code>Vendor: {window.navigator.vendor}</code>{" "}
                <code>Product: {window.navigator.product}</code>
              </CardContent>
            </Card>
          </Container>
        </Match>
      </Switch>
    </Dialog>
  );
};

export { Settings };
