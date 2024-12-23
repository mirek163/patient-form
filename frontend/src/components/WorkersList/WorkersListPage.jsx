import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const WorkersListPage = ({ workers, loading }) => {
  if (loading) {
    return <Typography>Načítání...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Seznam pečovatelů
      </Typography>

      <Paper elevation={3}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle1" className="table-header">
              Email
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" className="table-header">
              Role
            </Typography>
          </Grid>
        </Grid>

        {/* Table Rows */}
        {workers.length === 0 ? (
          <Typography variant="h6" className="empty-message">
            Žádní pečovatelé k dispozici.
          </Typography>
        ) : (
          workers.map((worker) => (
            <Grid container key={worker.user_id}>
              <Grid item xs={6}>
                <Typography>{worker.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{worker.role}</Typography>
              </Grid>
            </Grid>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default WorkersListPage;
