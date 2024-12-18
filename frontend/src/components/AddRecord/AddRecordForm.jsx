import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Typography, Button, Checkbox, FormControlLabel, Paper } from "@mui/material";
import axios from "axios";

const AddRecordPage = () => {
  const { patientId } = useParams(); 
  console.log("Patient ID from URL:", patientId);
  const [form, setForm] = useState({
    date: "",
    time: "",
    diagnosisCode: "",
    diagnosisDesc: "",
    comorbidities: "",
    socialAnamnesis: "",
    woundLocation: "",
    lateralization: "",
    woundSize: "",
    bedColor: "",
    edges: "",
    secretion: "",
    odor: "",
    surroundingTissue: "",
    photo: null,
    consentFirm: false,
    consentDoctor: false,
  });

  const [photoName, setPhotoName] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === "file" && files.length > 0) {
      setForm((prev) => ({ ...prev, photo: files[0] }));
      setPhotoName(files[0].name); 
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.consentFirm || !form.consentDoctor) {
      alert("Musíte poskytnout oba souhlasy!");
      return;
    }

    const formData = new FormData();
      formData.append("record_date", form.date);
      formData.append("record_time", form.time);
      formData.append("defect_diagnosis", form.diagnosisDesc);
      formData.append("mkn11", form.diagnosisCode);
      formData.append("anamnesis", form.comorbidities);
      formData.append("social_anamnesis", form.socialAnamnesis);
      formData.append("defect_description", form.woundLocation);
      formData.append("lateralization", form.lateralization);
      formData.append("wound_size", form.woundSize);
      formData.append("bed_color", form.bedColor);
      formData.append("edges", form.edges);
      formData.append("secretion", form.secretion);
      formData.append("odor", form.odor);
      formData.append("surrounding_tissue", form.surroundingTissue);

      if (form.photo) {
        formData.append("photo", form.photo);
      }


    try {
      const token = localStorage.getItem("authToken");
      await axios.post(`http://localhost:5000/patients/${patientId}/records`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data" 
        },
      });
      
      alert("Záznam byl úspěšně přidán!");
      navigate(`/patients/${patientId}`);
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Chyba při přidávání záznamu.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Přidat nový záznam
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>

          <Typography variant="h6" gutterBottom>
            Datum a čas
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <TextField
              label="Datum"
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label="Čas"
              name="time"
              value={form.time}
              onChange={handleChange}
              type="time"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Box>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Diagnóza defektu
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <TextField
              label="Kód podle MKN-11"
              name="diagnosisCode"
              value={form.diagnosisCode}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Popis defektu"
              name="diagnosisDesc"
              value={form.diagnosisDesc}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Anamnéza
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <TextField
              label="Komorbidity"
              name="comorbidities"
              value={form.comorbidities}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Sociální anamnéza"
              name="socialAnamnesis"
              value={form.socialAnamnesis}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Popis defektu
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <TextField label="Umístění rány" name="woundLocation" value={form.woundLocation} onChange={handleChange} fullWidth />
            <TextField label="Lateralizace" name="lateralization" value={form.lateralization} onChange={handleChange} fullWidth />
            <TextField label="Velikost (3D)" name="woundSize" value={form.woundSize} onChange={handleChange} fullWidth />
            <TextField label="Zbarvení lůžka" name="bedColor" value={form.bedColor} onChange={handleChange} fullWidth />
            <TextField label="Stav okrajů" name="edges" value={form.edges} onChange={handleChange} fullWidth />
            <TextField label="Stav sekrece" name="secretion" value={form.secretion} onChange={handleChange} fullWidth />
            <TextField label="Zápach" name="odor" value={form.odor} onChange={handleChange} fullWidth />
            <TextField label="Okolní tkáň" name="surroundingTissue" value={form.surroundingTissue} onChange={handleChange} fullWidth />
          </Box>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Fotodokumentace
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="contained" component="label">
              Vybrat soubor
              <input type="file" name="photo" hidden onChange={handleChange} />
            </Button>
            <Typography>{photoName || "Žádný soubor nebyl vybrán"}</Typography>
          </Box>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Souhlasy
          </Typography>
          <FormControlLabel
            control={<Checkbox name="consentFirm" checked={form.consentFirm} onChange={handleChange} />}
            label="Souhlas firmy/pacienta"
          />
          <FormControlLabel
            control={<Checkbox name="consentDoctor" checked={form.consentDoctor} onChange={handleChange} />}
            label="Souhlas lékaře"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "20px" }}>
            Uložit záznam
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddRecordPage;
