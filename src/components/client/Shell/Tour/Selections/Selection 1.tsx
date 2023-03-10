import { ArrowForward } from "@suid/icons-material";
import { Typography, Container, Card, CardMedia } from "@suid/material";

import logo from "./images/tour1.png"

export default function Selection1() {
    return <Container>
        <Card variant="outlined" sx={{ my: 2 }}>
            <CardMedia component="img" height={500} src={logo} sx={{ marginBottom: 1}} />
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Welcome to ReChat!</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>This is a third-party <code>revolt.chat</code> client but easier to use and mobile friendly!</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1 }}>Press <ArrowForward sx={{fontSize: 12}}/> to continue</Typography>
        </Card>
    </Container>
}