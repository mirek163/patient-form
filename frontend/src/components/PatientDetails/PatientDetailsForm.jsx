import React from "react";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PatientDetailsForm = ({ patient }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  if (!patient) {
    return <Typography variant="h6">Nebyla nalezena žádná data k pacientovi.</Typography>;
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleRecordClick = (recordId) => {
    navigate(`/patients/${patient.patient_id}/records/${recordId}`);
  };

  const handleAddRecordClick = () => {
    navigate(`/patients/${patient.patient_id}/add-record`);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detaily pacienta
      </Typography>
      <Typography variant="h6" gutterBottom>
        {patient.first_name} {patient.last_name} (Rodné číslo: {patient.birth_number})
      </Typography>
      <Typography variant="body1">{`Adresa: ${patient.address}`}</Typography>
      <Typography variant="body1">{`Zdravotní pojišťovna: ${patient.insurance}`}</Typography>
      <Typography variant="body1" fontWeight="bold">Praktický lékař:</Typography>
      <Typography variant="body1">
        {`Jméno: ${patient.doctor_name || "N/A"}   Kontakt: ${patient.doctor_contact || "N/A"}`}
      </Typography>
      <Typography variant="body1" fontWeight="bold">Ambulantní specialista:</Typography>
      <Typography variant="body1">
        {`Jméno: ${patient.adp_name || "N/A"}   Kontakt: ${patient.adp_contact || "N/A"}   Vedoucí sestra: ${patient.adp_head_nurse || "N/A"}`}
      </Typography>

      {(userRole === "doctor" || userRole === "nurse") && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          onClick={handleAddRecordClick}
        >
          Přidat nový záznam
        </Button>
      )}

      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Seznam záznamů
      </Typography>

      {/* Table Container */}
      <Paper sx={{ padding: 2, marginTop: 2 }} elevation={3}>
        {/* Table Header */}
        <Grid container sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", padding: 1 }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Datum</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Změna</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">Doktor</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Diagnóza</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Akce</Typography>
          </Grid>
        </Grid>

        {/* Table Rows */}
        {patient.records?.length > 0 ? (
          patient.records.map((record) => (
            <Grid
              container
              key={record.record_id}
              sx={{
                padding: 1,
                borderBottom: "1px solid #ddd",
                alignItems: "center",
              }}
            >
              <Grid item xs={2}>
                <Typography>{formatDate(record.record_date)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{record.record_time}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{record.author.email || "N/A"}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{record.defect_diagnosis || "N/A"}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => handleRecordClick(record.record_id)}
                >
                  Otevřít
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Žádné záznamy k dispozici.
          </Typography>
        )}
      </Paper>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ marginTop: "20px" }}
        onClick={() => navigate(-1)}
      >
        Zpět
      </Button>
    </Box>
  );
};

export default PatientDetailsForm;
