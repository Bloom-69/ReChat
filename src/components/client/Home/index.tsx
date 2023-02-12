import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@suid/material";

export default function Home() {
  return (
    <Container>
      <Card variant="outlined" sx={{ border: "none" }}>
        <CardMedia component="img" image="/Logo.svg" />
        <CardContent sx={{ textAlign: 'center'}}>
            <Typography>
                Select any Server to start chatting
            </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
          <Button>Source Code</Button>
          <Button>Enter Official Revolt App</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
