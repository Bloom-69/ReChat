import type { Accessor, Component, Setter } from "solid-js";
import { Message } from "revolt.js";
import GifTab from "./gifs/index";
import { Menu } from "@suid/material";

import * as ReChat from "../../../lib/ReChat";

interface props {
  setMessage?: Setter<string> | any;
  message?: Accessor<string> | any;
  messageToReact?: Message;
}

export const GifBoxPicker: Component<props> = (props) => {
  return (
    <Menu
      sx={{ height: 300 }}
      anchorEl={ReChat.anchorGif()}
      open={ReChat.showGifBoxPick()}
      onClose={() => ReChat.setShowGifBoxPick(false)}
    >
      <GifTab
        message={props.message}
        setMessage={props.setMessage}
      />
    </Menu>
  );
};
