import { createSignal } from "solid-js";
import * as ReChat from "../../../../lib/ReChat";
import { ulid } from "ulid";

import { revolt } from "../../../../lib/revolt";

import type { Component } from "solid-js";
import {
  FormControl,
  IconButton,
  Paper,
  TextField,
  Toolbar,
} from "@suid/material";
import { Face, Send } from "@suid/icons-material";

import background from "@suid/material/colors";

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

async function getStatus() {
  const userinfo = await revolt.api.get("/users/@me");
  ReChat.setSettings("statusText", userinfo.status?.text);
  ReChat.setSettings("status", userinfo.status?.presence);
}

const MessageBox: Component = () => {
  return (
    <Paper
      variant="outlined"
      sx={{ position: "sticky", bottom: 0, zIndex: 100, borderRadius: 0 }}
    >
      <Toolbar>
        <FormControl fullWidth sx={{ marginRight: 1 }}>
          <TextField
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
        <IconButton
          aria-label="Send"
          disabled={sending()}
          onClick={() => sendMessage(ReChat.newMessage())}
        >
          <Send />
        </IconButton>
      </Toolbar>
    </Paper>
  );
};

export { MessageBox };
