import { Accessor, Component, Setter } from "solid-js";
import { emojiDictionary } from "../../../../assets/emoji";
import { For } from "solid-js";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@suid/material";

interface props {
  setMessage: Setter<string>;
  message: Accessor<string>;
}

const EmojiTab: Component<props> = (props) => {
  function addToText(s: string) {
    props.setMessage(props.message() + s);
  }
  return (
    <List>
      <For each={Object.entries(emojiDictionary)}>
        {(emoji) => {
          if (emoji[1].startsWith("custom:")) {
            return (
              <ListItem>
                <ListItemButton onClick={() => addToText(`:${emoji[0]}:`)}>
                  {/* Support for legacy custom emotes */}
                  <ListItemIcon>
                    <img
                      src={`https://dl.insrt.uk/projects/revolt/emotes/${
                        emoji[1].substring(
                          7,
                        )
                      }`}
                      width={24}
                      height={24}
                    />
                  </ListItemIcon>
                  <ListItemText primary={":" + emoji[0] + ":"}/>
                </ListItemButton>
              </ListItem>
            );
          } else {
            return (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    addToText(`:${emoji[0]}:`);
                  }}
                >
                    <ListItemIcon>
                  <span
                    title={":" + emoji[0] + ":"}
                    class="emoji"
                  >
                    {emoji[1]}
                  </span>
                  </ListItemIcon>
                  <ListItemText primary={":" + emoji[0] + ":"}/>
                </ListItemButton>
              </ListItem>
            );
          }
        }}
      </For>
    </List>
  );
};

export default EmojiTab;
