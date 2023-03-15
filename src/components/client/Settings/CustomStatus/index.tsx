import { Add } from "@suid/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Radio, Select, TextField, Typography } from "@suid/material";
import { For, Match, Switch } from "solid-js";

import * as ReChat from "../../../../lib/ReChat"
import { revolt } from "../../../../lib/revolt";

function updateStatus(
    mode?: "Online" | "Focus" | "Idle" | "Busy" | "Invisible" | null | undefined,
    status?: string,
) {
    if (mode && status) {
        revolt.api.patch("/users/@me", {
            status: {
                presence: mode,
                text: status,
            },
        });
    } else {
        revolt.api.patch("/users/@me", {
            status: {
                presence: ReChat.settings.status || revolt.user?.presence,
                text: ReChat.settings.statusText || revolt.user?.status,
            },
        });
    }
}

function CustomCreation() {
    return <Dialog
        maxWidth="lg"
        open={ReChat.showCreation()}
        onClose={() => ReChat.setShowCreation(false)}
    >
        <DialogTitle>Create a new custom status</DialogTitle>
        <DialogContent>
            <Select
                sx={{ margin: 4.15 }}
                variant="standard"
                id="rechat-status-select"
                value={ReChat.newMode() || "Online"}
                onChange={(e) => ReChat.setNewMode(e.target.value)}
            >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Focus">Focus</MenuItem>
                <MenuItem value="Busy">Busy</MenuItem>
                <MenuItem value="Idle">Idle</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
            </Select>
            <TextField
                sx={{ mx: 1 }}
                variant="standard"
                onChange={(e: any) => ReChat.setNewStatus(e.currentTarget.value)}
                value={ReChat.newStatus() || ""}
                label="Text status"
            />
        </DialogContent>
        <DialogActions>
            <Button
                startIcon={<Add />}
                onClick={() => {
                    ReChat.setStatusList([
                        ...ReChat.statuslist(),
                        {
                            id: ReChat.statuslist().length,
                            mode: ReChat.newMode(),
                            text: ReChat.newStatus() ?? "",
                        },
                    ]);
                    console.log(ReChat.statuslist());
                }}
            >
                Add
            </Button>
        </DialogActions>
    </Dialog>
}

export default function CustomStatus() {
    return (<><Dialog open={ReChat.showCustom()} onClose={() => ReChat.setShowCustom(false)}>
        <DialogTitle title="Set Custom Status">Set Custom Status</DialogTitle>
        <DialogContent>
            <FormGroup>
                <For each={ReChat.statuslist()}>
                    {(prefab) => (
                        <List>
                            <ListItem>
                                <ListItemButton sx={{mx: 1, borderRadius: 1}} onClick={() => updateStatus(prefab.mode, prefab.text)}>
                                    <ListItemText primary={prefab.mode} secondary={prefab.text} />
                                </ListItemButton>
                                <Button
                                    onClick={() => {
                                        ReChat.setStatusList(
                                            ReChat.statuslist().filter((obj) => obj.id !== prefab.id)
                                        );
                                    }}
                                    color="error"
                                    variant="contained"
                                >
                                    Remove
                                </Button>
                            </ListItem>
                        </List>
                    )}
                </For>
            </FormGroup>
        </DialogContent>
        <DialogActions>
            <Button startIcon={<Add />} onClick={() => { ReChat.setShowCreation(true) }}>New</Button>
        </DialogActions>
    </Dialog>
        <CustomCreation />
    </>
    )
}