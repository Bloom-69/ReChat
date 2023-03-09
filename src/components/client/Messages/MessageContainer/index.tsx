import { UserMessageBase } from "../MessageBase";
import { For, lazy, Match, Suspense, Switch } from "solid-js";
import { messages, setMessages } from "../../../../lib/ReChat";

import type { Component } from "solid-js";
import { revolt } from "../../../../lib/revolt";
import * as ReChat from "../../../../lib/ReChat";
import { produce } from "solid-js/store";
import { CircularProgress } from "@suid/material";
import Loading from "../Loading";

revolt.on("message", async (m) => {
  if (m.channelID === ReChat.servers.current_channel?.id) {
    setMessages(produce((old) => old.push(m)));
    window.scroll(0, document.body.scrollHeight)
  } 
});

const MessageContainer: Component = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Match when={messages}>
          <For each={messages?.reverse()}>
            {(message) => {
              return (
                <div>
                  <UserMessageBase message={message} />
                </div>
              );
            }}
          </For>
        </Match>
      </Switch>
    </Suspense>
  );
};

export { MessageContainer };
