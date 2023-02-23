import { createSignal } from "solid-js";
import * as ReChat from "../../../../lib/ReChat";
import { ulid } from "ulid";

import type { Component } from "solid-js";
import {
  Button,
  FormControl,
  IconButton,
  Paper,
  TextField,
  Toolbar,
} from "@suid/material";
import { Face, Gif, Send } from "@suid/icons-material";

const [sending, setSending] = createSignal<boolean>(false);

async function sendMessage(message: string) {
  try {
    setSending(true);
    const nonce = ulid();
    if (ReChat.servers.current_channel) {
      ReChat.servers.current_channel
        ?.send({
          content: message,
          nonce,
        })
        .catch((e) => {
          throw e;
        });
    }
    ReChat.setNewMessage("");
    ReChat.setReplies([]);
    ReChat.setImages(undefined);
    ReChat.setShowPicker(false);
  } catch (err) {
    console.error("Unexpected error while sending message:", err);
  } finally {
    setSending(false);
  }
}

const MessageBox: Component = () => {
  return (
    <Paper
      variant="outlined"
      sx={{ position: "sticky", bottom: 0, zIndex: 1, borderRadius: 0 }}
    >
      <Toolbar>
        <FormControl fullWidth sx={{ marginRight: 1 }}>
          <TextField
            multiline
            variant="standard"
            size="small"
            sx={{ width: "auto" }}
            value={ReChat.newMessage()}
            placeholder="Type Anything..."
            onChange={(e: any) => ReChat.setNewMessage(e.currentTarget.value)}
          />
        </FormControl>
        {ReChat.settings.experiments.picker && (
          <IconButton
            aria-label="Emoji"
            onClick={(event) => {
              ReChat.setShowPicker(true);
              ReChat.setAnchorPicker(event.currentTarget);
            }}
          >
            <Face />
          </IconButton>
        )}

        {ReChat.settings.experiments.gifbox && (
          <IconButton
            disabled
            aria-label="Gifbox"
            onClick={(event) => {
              ReChat.setShowGifBoxPick(true);
              ReChat.setAnchorGif(event.currentTarget);
            }}
          >
            <Gif/>
          </IconButton>
        )}
        <Button
          endIcon={<Send />}
          aria-label="Send"
          variant="contained"
          disabled={sending()}
          onClick={() => sendMessage(ReChat.newMessage())}
        >
          Send
        </Button>
      </Toolbar>
    </Paper>
  );
};

export { MessageBox };
