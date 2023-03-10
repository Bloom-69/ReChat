import { Settings } from "@suid/icons-material";
import { Typography, Container, Card } from "@suid/material";

export default function Selection3() {
    return <Container>
        <Card variant="outlined" sx={{ my: 60 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Change your settings with ease</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1 }}>Press <Settings sx={{fontSize: 12}}/> to start changing some settings</Typography>
        </Card>
    </Container>
}