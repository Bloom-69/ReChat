import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, TextField, Fab, InputBase } from "@suid/material";
import { revolt } from "../../../../lib/revolt";

import * as ReChat from "../../../../lib/ReChat"
import { createSignal } from "solid-js";
import { Add, Image, Remove, Upload } from "@suid/icons-material";

const onPFPChange = (e: Event & { currentTarget: HTMLInputElement; target: Element }) => {
    if (e.currentTarget.files) ReChat.setAvatarImage(e.currentTarget.files)
}

const [Member_Avatar_URL, Set_Member_Avatar_URL] = createSignal<string>()

if (ReChat.servers.current_server) {
    ReChat.servers.current_server.fetchMe().then(me => {
        Set_Member_Avatar_URL(me.generateAvatarURL());
    })
}

export default function ServerWideChanger() {
    return <>
        <form onSubmit={async (e) => {
            console.log("Clicked");
            e.preventDefault();
            const file = await revolt.uploadAttachment(
                `rechat-avatar-${revolt.user?.id}`,
                ReChat.avatarImage(),
                "avatars"
            );
            console.log(file);
            ReChat.servers.current_server?.me?.edit({
                avatar:
                    file ||
                    ReChat.servers.current_server.me.avatar?.id ||
                    null,
                nickname: ReChat.nickname() || null,
            });
        }}>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Current Server:"
                        secondary={ReChat.servers.current_server?.name ||
                            "You aren't in this server!"} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={ReChat.avatarImage()
                            ? URL.createObjectURL(ReChat.avatarImage())
                            : Member_Avatar_URL() ||
                                revolt.user?.avatar
                                ? `https://autumn.revolt.chat/avatars/${ReChat.servers.current_server?.me?.avatar.id ||
                                revolt.user?.avatar?.id}`
                                : `https://api.revolt.chat/users/${revolt.user?.id}/default_avatar`}>
                            {ReChat.servers.current_channel?.name.substring(0, 1) || revolt.user.username.substring(0, 1)}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Profile Image" />
                    <Button
                        variant="contained"
                        startIcon={<Image/>}
                        sx={{ width: 'auto' }}
                        component="input"
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={(e: any) => {
                            onPFPChange(e);
                        }}
                    >
                        Add Image
                    </Button>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Current Username"
                        secondary={ReChat.servers.current_server?.me?.nickname || revolt.user.username}
                    />
                    <TextField
                        label="New Username"
                        variant="standard"
                        value={ReChat.nickname() || ""}
                        onChange={(e) => ReChat.setNickname(e.currentTarget.value)}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Update Info" secondary="It will upload your new info to the server"/>
                    <Fab
                        type="submit"
                        variant="extended"
                    >
                        <Upload sx={{ mr: 1 }} />
                        Submit
                    </Fab>
                </ListItem>
            </List>
        </form>
    </>
}