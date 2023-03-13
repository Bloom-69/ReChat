import { Settings } from "@suid/icons-material";
import { Typography, Container, Card, CardMedia } from "@suid/material";

import logo from "./images/tour5.png"

export default function Selection4() {
    return <Container>
        <Card variant="outlined" sx={{ my: 2 }}>
            <CardMedia component="img" height={500} src={logo} sx={{ marginBottom: 1 }} />
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Start Talking with your friends (Coming soon)</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1 }}>Talk your friends while you are inside home</Typography>
        </Card>
    </Container>
}