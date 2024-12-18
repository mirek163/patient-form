import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Box, Typography, Button, Modal } from "@mui/material"; 

const RecordDetailsPage = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const navigate = useNavigate(); 

  if (!record) {
    return <Typography>Record not found</Typography>;
  }

  const imageUrl = `http://localhost:5000/patients/${record.patient_id}/records/${record.record_id}/photo`;

  const handleOpen = () => {
    setPhotoUrl(imageUrl);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detail záznamu
      </Typography>
      <Typography variant="body1">{`Pacient: ${record.patient.first_name} ${record.patient.last_name}`}</Typography>
      <Typography variant="body1">{`Email autora: ${record.author?.email || "N/A"}`}</Typography>
      <Typography variant="body1">{`Datum: ${new Date(record.record_date).toLocaleDateString()}`}</Typography>
      <Typography variant="body1">{`Čas: ${record.record_time}`}</Typography>
      <Typography variant="body1">{`Diagnóza: ${record.defect_diagnosis}`}</Typography>
      <Typography variant="body1">{`Kód diagnózy (MKN-11): ${record.mkn11}`}</Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Anamnéza
      </Typography>
      <Typography variant="body1">{`Komorbidity: ${record.anamnesis || "N/A"}`}</Typography>
      <Typography variant="body1">{`Sociální anamnéza: ${record.social_anamnesis || "N/A"}`}</Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Popis defektu
      </Typography>
      <Typography variant="body1">{`Umístění rány: ${record.defect_description || "N/A"}`}</Typography>
      <Typography variant="body1">{`Lateralizace: ${record.lateralization || "N/A"}`}</Typography>
      <Typography variant="body1">{`Velikost: ${record.wound_size || "N/A"}`}</Typography>
      <Typography variant="body1">{`Zbarvení lůžka rány: ${record.bed_color || "N/A"}`}</Typography>
      <Typography variant="body1">{`Stav okrajů rány: ${record.edges || "N/A"}`}</Typography>
      <Typography variant="body1">{`Stav sekrece: ${record.secretion || "N/A"}`}</Typography>
      <Typography variant="body1">{`Zápach: ${record.odor || "N/A"}`}</Typography>
      <Typography variant="body1">{`Okolní tkáň defektu: ${record.surrounding_tissue || "N/A"}`}</Typography>

      {record.photo && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="body1">
            <strong>Foto defektu:</strong>
          </Typography>
          <img
            src={imageUrl}
            alt="Defekt"
            style={{ maxWidth: "100%", maxHeight: "75px", cursor: "pointer" }}
            onClick={handleOpen}
          />
        </Box>
      )}

      {/* Modal pro zvětšení obrázku */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: 2,
          maxWidth: 800,
          maxHeight: '80%',
          overflow: 'auto',
        }}>
          <img
            src={photoUrl}
            alt="Zvětšovací efekt"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Modal>
      

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
        onClick={() => navigate(-1)}
      >
        Zpět
      </Button>
    </Box>
  );
};

export default RecordDetailsPage;
