import React from "react";
import { Box, Typography } from "@mui/material";

const RecordDetailsPage = ({ record }) => {
  if (!record) {
    return <Typography>Record not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detail záznamu
      </Typography>
      <Typography variant="body1">{`Autor záznamu: ${record.author}`}</Typography>
      <Typography variant="body1">{`Datum: ${record.date}`}</Typography>
      <Typography variant="body1">{`Čas: ${record.time}`}</Typography>
      <Typography variant="body1">{`Diagnóza: ${record.diagnosis.description}`}</Typography>
      <Typography variant="body1">{`Kód diagnózy: ${record.diagnosis.code}`}</Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Anamnéza
      </Typography>
      <Typography variant="body1">{`Komorbidity: ${record.anamnesis.comorbidities}`}</Typography>
      <Typography variant="body1">{`Sociální anamnéza: ${record.anamnesis.social}`}</Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Popis defektu
      </Typography>
      <Typography variant="body1">{`Umístění rány: ${record.wound.location}`}</Typography>
      <Typography variant="body1">{`Lateralizace: ${record.wound.lateralization}`}</Typography>
      <Typography variant="body1">{`Velikost: ${record.wound.size}`}</Typography>
      <Typography variant="body1">{`Zbarvení lůžka rány: ${record.wound.bedColor}`}</Typography>
      <Typography variant="body1">{`Stav okrajů rány: ${record.wound.edges}`}</Typography>
      <Typography variant="body1">{`Stav sekrece: ${record.wound.secretion}`}</Typography>
      <Typography variant="body1">{`Zápach: ${record.wound.odor}`}</Typography>
      <Typography variant="body1">{`Okolní tkáň defektu: ${record.wound.surroundingTissue}`}</Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Souhlasy
      </Typography>
      <Typography variant="body1">{`Souhlas firmy/pacienta: ${record.consents.firm ? "Ano" : "Ne"}`}</Typography>
      <Typography variant="body1">{`Souhlas lékaře: ${record.consents.doctor ? "Ano" : "Ne"}`}</Typography>
    </Box>
  );
};

export default RecordDetailsPage;
