import { createSignal} from "solid-js";
import * as ReChat from "../../../../lib/ReChat";
import { ulid } from "ulid";

import { revolt } from "../../../../lib/revolt";

import type { Component } from "solid-js";
import { FormControl, IconButton, TextField, Toolbar } from "@suid/material";
import { Send } from "@suid/icons-material";

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
    <Toolbar sx={{position: 'sticky', bottom: 0, zIndex: 100, background: '#f5f5f5'}}>
      <FormControl fullWidth sx={{marginRight: 1}}>
        <TextField variant="outlined" size="small" sx={{width: 'auto'}} value={ReChat.newMessage()} placeholder="Type Anything..." onChange={(e:any) => ReChat.setNewMessage(e.currentTarget.value)}/>
      </FormControl>
      <IconButton
          aria-label="Send"
          disabled={sending()}
          onClick={() => sendMessage(ReChat.newMessage())}
        >
          <Send />
        </IconButton>
    </Toolbar>
  );
};

export { MessageBox };
