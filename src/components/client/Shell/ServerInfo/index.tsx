import { CopyAll } from "@suid/icons-material"
import { ButtonGroup, Button, Dialog, DialogContent, DialogTitle, Typography, DialogActions, Card, CardMedia } from "@suid/material"
import * as ReChat from "../../../../lib/ReChat"

export default function ServerInfo() {

    return <Dialog open={ReChat.showInfo()} onClose={() => ReChat.setShowInfo(false)}>
        <DialogTitle> {ReChat.servers.current_server?.name || "Not in Server"} </DialogTitle>
        <DialogContent>
            <Card sx={{m:2, p:2}}>
                <CardMedia component="img" src={ReChat.servers.current_server?.banner.generateURL()}/>
                <Typography variant="subtitle1">Server Description</Typography>
                <Typography variant="body1">{ReChat.servers.current_server?.description || "Unable to fetch description"}</Typography>
            </Card>
        </DialogContent>
        <DialogActions>
            <ButtonGroup>
                <Button startIcon={<CopyAll />} onClick={() => alert(ReChat.servers.current_server?.ownerID.toString())}>Copy Owner ID</Button>
            </ButtonGroup>
        </DialogActions>
    </Dialog>
};