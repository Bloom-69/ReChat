import { Typography, Container, Card, CardMedia, Button } from "@suid/material";

import * as ReChat from "../../../../../lib/ReChat"

import logo from "./images/tour6.png"

export default function Selection5() {
    return <Container>
        <Card variant="outlined" sx={{ my: 2 }}>
        <CardMedia component="img" height={500} src={logo} sx={{ marginBottom: 1 }} />
            <Typography variant="h4" sx={{ textAlign: 'center' }}>That it for today!</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1 }}>You've finished the ReChat tour! Now start talking some people</Typography>
            <Button sx={{display: 'block', mx: 'auto', my: 1}} onClick={() => ReChat.setSettings("tour", "show", false)}>Close Tour (It will not see tour next time)</Button>
        </Card>
    </Container>
}