import { BaseMessage, Message } from "revolt-toolset";
import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import { css } from "solid-styled-components";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Markdown } from "../../../markdown";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grow,
  Stack,
} from "@suid/material";

import * as ReChat from "../../../../lib/ReChat";

dayjs.extend(relativeTime);

const UserMessageBase: Component<{ message: Message }> = ({ message }) => {
  const [replies, setReplies] = createSignal<BaseMessage[] | undefined>();
  
  message.fetchReplies().then((replies) => {
    setReplies(replies);
  });

  return (
    <Grow in={true}>
      <Card variant="outlined" sx={{ margin: 1 }}>
        <CardHeader
          title={
            <>
              <Grow in={true}>
                <Stack direction="row">
                  <Avatar
                    src={message.generateMasqAvatarURL() ||
                      message.member.generateAvatarURL() ||
                      message.author.generateAvatarURL()}
                  />{" "}
                  <span
                    style={{ "margin-top": "3.2px", "margin-left": "5px" }}
                    class={message.member.colorRole &&
                        message.member.colorRole.color.includes("gradient")
                      ? css`
                background: ${message.member.colorRole.color};
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              `
                      : css`
                color: ${message.member.colorRole?.color || "inherit"};
              `}
                  >
                    {message.masquerade?.name ||
                      message.member?.nickname ||
                      message.author?.username ||
                      "Random Revolt User"}
                  </span>
                </Stack>
              </Grow>
            </>
          }
          subheader={
            <Show when={replies()}>
              <For each={replies()}>
                {(reply) =>
                  reply.isUser() && (
                    <Grow
                      in={true}
                    >
                      <Stack sx={{ margin: 2 }} direction="row">
                        <Avatar
                          sx={{ width: 24, height: 24, marginRight: 1 }}
                          src={reply.author.generateAvatarURL() || ""}
                        />
                        <span
                          style={{ "margin-right": "3px" }}
                          class={reply.member.colorRole &&
                              reply.member.colorRole.color.includes("gradient")
                            ? css`
                    background: ${reply.member.colorRole.color};
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  `
                            : css`
                    color: ${reply.member.colorRole?.color || "inherit"};
                  `}
                        >
                          {reply.masquerade?.name ||
                            reply.member?.nickname ||
                            reply.author?.username ||
                            "Random Revolt User"}:
                        </span>
                        <Markdown
                          content={reply.content.length > 24 &&
                              reply.content.substring(0, 24) ||
                            "**No Content**"}
                        />
                      </Stack>
                    </Grow>
                  )}
              </For>
            </Show>
          }
        />
          <CardContent>
            <Markdown content={message.content || ""} />
            {ReChat.settings.showMedia && (
              <Show when={message.attachments}>
                <Stack direction="column" gap={2}>
                    <For each={message.attachments}>
                      {(attachment) => (
                        <Switch>
                          <Match when={attachment.metadata.type == "Image"}>
                            <img
                              src={attachment.generateURL()}
                              style={{
                                "max-width": "500px",
                                "max-height": "500px",
                                "border-radius": "4px",
                              }}
                            />
                          </Match>
                          <Match when={attachment.metadata.type === "Video"}>
                            <video
                              src={attachment.generateURL()}
                              style={{
                                "max-width": "500px",
                                "max-height": "500px",
                                "border-radius": "4px",
                              }}
                              controls
                            />
                          </Match>
                          <Match when={attachment.metadata.type === "Audio"}>
                            <audio
                              src={attachment.generateURL()}
                              style={{
                                "max-width": "500px",
                                "max-height": "500px",
                                "border-radius": "4px",
                              }}
                              controls
                            />
                          </Match>
                        </Switch>
                      )}
                    </For>
                </Stack>
              </Show>
            )}
          </CardContent>
      </Card>
    </Grow>
  );
};

export { UserMessageBase };
