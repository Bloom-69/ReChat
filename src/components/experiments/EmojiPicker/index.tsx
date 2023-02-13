import type { Accessor, Component, Setter } from "solid-js";
import { createSignal } from "solid-js";
import { Message } from "revolt.js";
import EmojiTab from "./Tabs/emoji";
import GifTab from "./Tabs/gifbox";
import {
  AppBar,
  Button,
  ButtonGroup,
  Menu,
  Paper,
  Toolbar,
} from "@suid/material";

import * as ReChat from "../../../lib/ReChat";
import { Face, GifBox } from "@suid/icons-material";

interface props {
  setMessage?: Setter<string> | any;
  message?: Accessor<string> | any;
  type: string;
  messageToReact?: Message;
}

const [tab, setTab] = createSignal<number>(0);

export const Picker: Component<props> = (props) => {
  return (
    <Menu
      sx={{ height: 300 }}
      anchorEl={ReChat.anchorPicker()}
      open={ReChat.showPicker()}
      onClose={() => ReChat.setShowPicker(false)}
    >
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <ButtonGroup fullWidth>
            <Button startIcon={<Face />} onClick={() => setTab(0)}>
              Emojis
            </Button>
            {ReChat.settings.experiments.gifbox && (
              <Button
                startIcon={<GifBox />}
                onClick={() => setTab(1)}
              >
                Gif
              </Button>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      {tab() === 0
        ? (
          <EmojiTab
            setMessage={props.setMessage}
            message={props.message}
          />
        )
        : (
          <GifTab
            message={props.message}
            setMessage={props.setMessage}
            tab={tab}
          />
        )}
    </Menu>
  );
};
