import React from "react";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./PatientListStyles.css";

const PatientListPage = ({ patients }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const handleAddNewPatient = () => {
    navigate("/patients/add");
  };

  const handleViewDetails = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <Box className="patient-list-container">
          <Typography variant="h4" gutterBottom>
          List pacientů
        </Typography>
      <Box className="add-button-container">
        {(userRole === "doctor" || userRole === "nurse") && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewPatient}
          >
            Přidat
          </Button>
        )}
      </Box>

      <Paper className="patient-list-table" elevation={3}>
        <Grid container className="patient-list-header">
          <Grid item xs={3}>
            <Typography variant="subtitle1" className="table-header">
              Jméno
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className="table-header">
            Rodné číslo
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" className="table-header">
              Adresa
            </Typography>
          </Grid>
          <Grid item xs={2} className="table-header-actions">
            <Typography variant="subtitle1" className="table-header">
              Akce
            </Typography>
          </Grid>
        </Grid>
        {patients.map((patient) => (
          <Grid
            container
            key={patient.id}
            className="patient-list-row"
            //onClick={() => handleViewDetails(patient.id)}
          >
            <Grid item xs={3}>
              <Typography>{patient.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{patient.idNumber}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{patient.address}</Typography>
            </Grid>
            <Grid item xs={2} className="table-actions">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewDetails(patient.id)}
              >
                Více
              </Button>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </Box>
  );
};

export default PatientListPage;