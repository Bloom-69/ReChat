import {
  Alert,
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
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
  Circle,
  Close as CloseIcon,
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
            <ListItem>
              <ListItemButton onClick={() => setTab(3)}>
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
              <ListItemButton onClick={() => setTab(4)}>
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
                Chaging Colors and some component requires client restart
              </Alert>
              <List>
                <Show when={window.location.hostname.includes("localhost")}>
                  <ListItem>
                    <ListItemIcon>
                      <Circle
                        sx={{ color: ReChat.settings.appearance.primary_color }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Primary Color"
                      secondary="Unavailable in Canary Version"
                    />
                    <TextField
                      disabled
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
                </Show>
                <Show when={window.location.hostname.includes("canary")}>
                  <ListItem>
                    <ListItemIcon>
                      <Circle
                        sx={{ color: ReChat.settings.appearance.primary_color }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Primary Color"
                      secondary="Unavailable in Canary Version"
                    />
                    <TextField
                      disabled
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
                </Show>
                <Show when={window.location.hostname.includes("client")}>
                  <ListItem>
                    <ListItemIcon>
                      <Circle
                        sx={{ color: ReChat.settings.appearance.primary_color }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Primary Color" />
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
                </Show>
                <ListItem>
                  <ListItemIcon>
                    <Apps />
                  </ListItemIcon>
                  <ListItemText primary="AppBar Variants" />
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
        <Match when={Tab() === 4}>
          <Container sx={{ marginTop: 1 }}>
            <Card>
              <Show when={window.location.hostname.includes("client")}>
                <CardHeader title="ReChat (Stable)" subheader="Version 0.0.2" />
              </Show>
              <Show when={window.location.hostname.includes("localhost")}>
                <CardHeader title="ReChat (Dev)" subheader="Version 0.0.3" />
              </Show>
              <Show when={window.location.hostname.includes("canary")}>
                <CardHeader title="ReChat (Canary)" subheader="Version 0.0.3" />
              </Show>
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
