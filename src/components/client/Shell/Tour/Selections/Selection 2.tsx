import { Menu } from "@suid/icons-material";
import { Typography, Container, Card } from "@suid/material";

export default function Selection2() {
    return <Container>
        <Card variant="outlined" sx={{ my: 60 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Swicth any server and channels with ease</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1 }}>Press <Menu sx={{fontSize: 12}}/> to start switching</Typography>
        </Card>
    </Container>
}