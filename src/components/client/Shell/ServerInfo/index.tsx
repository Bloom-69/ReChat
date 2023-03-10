import { CopyAll } from "@suid/icons-material"
import { ButtonGroup, Button, Dialog, DialogContent, DialogTitle, Typography, DialogActions } from "@suid/material"
import * as ReChat from "../../../../lib/ReChat"

export default function ServerInfo() {

    return <Dialog open={ReChat.showInfo()} onClose={() => ReChat.setShowInfo(false)}>
        <DialogTitle title={ReChat.servers.current_server?.name || "Not in Server"} />
        <DialogContent>
            <Typography variant="subtitle1">Server Description</Typography>
            <Typography variant="body1">{ReChat.servers.current_server?.description || "Unable to fetch description"}</Typography>
            <Typography variant="subtitle1">Server Owner</Typography>
            <Typography variant="body1">{ReChat.servers.current_server?.owner.username || "Unable to fetch username"}</Typography>
            <Typography variant="subtitle1">Created in: {ReChat.servers.current_server?.createdAt || "Unable to fetch Date"}</Typography>
        </DialogContent>
        <DialogActions>
            <ButtonGroup>
                <Button startIcon={<CopyAll />} onClick={() => alert(ReChat.servers.current_server?.ownerID.toString())}>Copy Owner ID</Button>
            </ButtonGroup>
        </DialogActions>
    </Dialog>
};