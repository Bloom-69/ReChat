import { UserMessageBase } from "../MessageBase";
import { For } from "solid-js"
import { messages, servers, setMessages } from "../../../../lib/ReChat";

import type { Component } from "solid-js";
import { revolt } from "../../../../lib/revolt";
import * as ReChat from "../../../../lib/ReChat" 
import { produce } from "solid-js/store";

revolt.on("message", async m => {
    if (m.channelID === ReChat.servers.current_channel?.id) {
        setMessages(produce((old) => old.push(m)))
    }
})

const MessageContainer: Component = () => {
    return (
        <For each={messages?.reverse()}>
            {message => {
                    return (
                        <div>
                            <UserMessageBase message={message} />
                        </div>
                    )
            }}
        </For>
    )
}

export { MessageContainer };
