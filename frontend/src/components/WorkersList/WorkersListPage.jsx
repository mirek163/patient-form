import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./WorkersListPage.css"; 

const WorkersListPage = ({ workers, loading }) => {
  const navigate = useNavigate();

  const handleViewPatients = (workerId) => {
    navigate(`/workers/${workerId}/patients`);
  };

  if (loading) {
    return <Typography>Načítání...</Typography>;
  }

  return (
    <Box className="worker-list-container">
      <Typography variant="h4" gutterBottom>
        Seznam pečovatelů
      </Typography>

      <Paper className="worker-list-table" elevation={3}>
        <Grid container className="worker-list-header">
          <Grid item xs={6}>
            <Typography variant="subtitle1" className="table-header">
              Email
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" className="table-header">
              Role
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" className="table-header">
              Akce
            </Typography>
          </Grid>
        </Grid>

        {workers.length === 0 ? (
          <Typography variant="h6" className="empty-message">
            Žádní pečovatelé k dispozici.
          </Typography>
        ) : (
          workers.map((worker) => (
            <Grid
              container
              key={worker.user_id}
              className="worker-list-row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>{worker.email}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{worker.role}</Typography>
              </Grid>
              <Grid item xs={2} className="table-actions">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewPatients(worker.user_id)}
                >
                  Pacienti
                </Button>
              </Grid>
            </Grid>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default WorkersListPage;
