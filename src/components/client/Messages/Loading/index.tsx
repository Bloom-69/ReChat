import { CircularProgress, Paper } from "@suid/material";

export default function Loading() {
  return (
    <Paper sx={{ display: "block", marginInline: 'auto', borderRadius: "100%" }}>
      <CircularProgress />
    </Paper>
  );
}
