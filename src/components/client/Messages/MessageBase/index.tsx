import { BaseMessage, Message } from "revkit";
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
import { Reply, Image } from "@suid/icons-material";

dayjs.extend(relativeTime);

const UserMessageBase: Component<{ message: Message }> = ({ message }) => {
  const [replies, setReplies] = createSignal<BaseMessage[] | undefined>();

  message.fetchReplies().then((replies) => {
    setReplies(replies);
  });

  return (
    <Grow in={true}>
      <Card variant="outlined" sx={{ margin: 3 }}>
        <CardHeader
          title={
            <Grow in={true}>
              <Stack gap={2} direction="row">
                <Avatar
                  src={message.generateMasqAvatarURL() ||
                    message.member.generateAvatarURL() ||
                    message.author.generateAvatarURL()}
                  variant="rounded"
                />
                <span
                  style={{ "font-weight": "bold", "margin-top": "3.2px" }}
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
                    "Revolt User"}
                </span>
              </Stack>
            </Grow>
          }
          subheader={
            <Show when={replies()}>
              <For each={replies()}>
                {(reply) => {
                  return reply.isUser() && (
                    <Grow
                      in={true}
                    >
                      <Stack sx={{ my: 1 }} direction="row">
                        <Reply sx={{ mx: .5 }} />
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
                            "Revolt User"}:
                        </span>
                        <Markdown
                          content={reply.content.length > 24 &&
                              reply.content.substring(0, 50) ||
                            reply.attachments && "**Contains Attachments**" ||
                            "**Unable to load message**"}
                        />
                        {reply.attachments && (
                          <Stack>
                            <Image/>
                            <Markdown content={reply.content.length > 12 && reply.content.substring(0,50) || ""}/>
                          </Stack>
                        )}
                      </Stack>
                    </Grow>
                  );
                }}
              </For>
            </Show>
          }
        />
        <CardContent sx={{ width: "auto" }}>
          <Markdown content={message.content || ""} />
          {ReChat.settings.showMedia && (
            <Show when={message.attachments}>
              <Stack direction="column" gap={2}>
                <For each={message.attachments}>
                  {(attachment) => {
                    return (
                      <Switch>
                        <Match when={attachment.metadata.type == "Image"}>
                          <img
                            loading="lazy"
                            onClick={() =>
                              window.location.assign(attachment.generateURL())}
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
                    );
                  }}
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
