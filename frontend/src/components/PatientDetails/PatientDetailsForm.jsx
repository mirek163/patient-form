import React from "react";
import { Box, Typography, List, ListItem, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PatientDetailsForm = ({ patient }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();


  if (!patient) {
    return <Typography variant="h6">Nebyla nalezena žádná data k pacientovi.</Typography>;
  }

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
        {patient.first_name}{patient.last_name} (Rodné číslo: {patient.birth_number})
      </Typography>
      <Typography variant="body1">{`Adresa: ${patient.address}`}</Typography>
      <Typography variant="body1">{`Zdravotní pojišťovna: ${patient.insurance}`}</Typography>
      <Typography variant="body1" fontWeight="bold">Praktický lékař:</Typography>
      <Typography variant="body1">
        {`Jméno: ${patient.doctor_name || "N/A"}   Kontakt: ${patient.doctor_contact || "N/A"} `}
      </Typography>
      <Typography variant="body1" fontWeight="bold">Ambulantní specialista:</Typography>
      <Typography variant="body1">
        {`Jméno: ${patient.adp_name || "N/A"}   Kontakt: ${patient.adp_contact || "N/A"}   Vedoucí sestra: ${patient.adp_head_nurse || "N/A"}` }
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
      <List>
        {patient.records?.length > 0 ? (
          patient.records.map((record) => (
            <React.Fragment key={record.record_id}>
              <ListItem
                button
                onClick={() => handleRecordClick(record.record_id)}
                sx={{ padding: "10px", cursor: "pointer" }}
              >
                <Typography variant="body1">
                  {`Datum: ${record.record_date || "N/A"}, Doktor: ${record.author.email || "N/A"}, Diagnóza: ${record.defect_description || "N/A"}`}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1">Žádné záznamy k dispozici.</Typography>
        )}
      </List>
    </Box>
  );
};

export default PatientDetailsForm;
