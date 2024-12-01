import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PatientDetailsPage = ({ patient }) => {
  const navigate = useNavigate();

  const handleRecordClick = (recordId) => {
    navigate(`/patients/${patient.id}/records/${recordId}`);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detaily pacienta
      </Typography>
      <Typography variant="h6" gutterBottom>
        {patient.name} (Rodné číslo: {patient.idNumber})
      </Typography>
      <Typography variant="body1">{`Adresa: ${patient.address}`}</Typography>
      <Typography variant="body1">{`Zdravotní pojišťovna: ${patient.insurance}`}</Typography>
      <Typography variant="body1" fontWeight="bold">Praktický lékař:</Typography>
      <Typography variant="body1">{`Jméno: ${patient.doctor.name}`}</Typography>
      <Typography variant="body1">{`Kontakt: ${patient.doctor.contact}`}</Typography>

      <Typography variant="body1" fontWeight="bold">Ambulantní specialista:</Typography>
      <Typography variant="body1">{`Jméno: ${patient.specialist.name}`}</Typography>
      <Typography variant="body1">{`Kontakt: ${patient.specialist.contact}`}</Typography>
      <Typography variant="body1">{`Vedoucí sestra: ${patient.specialist.headNurse}`}</Typography>
 
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Seznam záznamů
      </Typography>
      <List>
        {patient.records.map((record) => (
          <React.Fragment key={record.id}>
            <ListItem
              button
              onClick={() => handleRecordClick(record.id)}
              sx={{ padding: "10px" ,cursor: "pointer"}}
            >
              <Typography variant="body1">
                {`Datum: ${record.date}, Čas: ${record.time}, Doktor: ${record.author}, Diagnóza: ${record.diagnosis.description}`}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default PatientDetailsPage;
