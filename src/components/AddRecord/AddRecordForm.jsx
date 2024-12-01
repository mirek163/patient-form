import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const AddRecordPage = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      setForm((prev) => ({
        ...prev,
        photo: files[0],
      }));
      setPhotoName(files[0].name);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.consentFirm || !form.consentDoctor) {
      alert("Musíte poskytnout oba souhlasy!");
      return;
    }

    console.log("Odeslaný záznam:", form);
    alert("Záznam byl úspěšně přidán!");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Přidat nový záznam
      </Typography>
      <form onSubmit={handleSubmit}>
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

        {/* Diagnóza defektu */}
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

        {/* Anamnéza */}
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

        {/* Popis defektu */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Popis defektu
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            label="Umístění rány"
            name="woundLocation"
            value={form.woundLocation}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Lateralizace"
            name="lateralization"
            value={form.lateralization}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Velikost (3D)"
            name="woundSize"
            value={form.woundSize}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Zbarvení lůžka rány (spodina)"
            name="bedColor"
            value={form.bedColor}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Stav okrajů rány"
            name="edges"
            value={form.edges}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Stav sekrece"
            name="secretion"
            value={form.secretion}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Zápach"
            name="odor"
            value={form.odor}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Okolní tkáň defektu"
            name="surroundingTissue"
            value={form.surroundingTissue}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Fotodokumentace */}
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

        {/* Souhlasy */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Souhlasy
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="consentFirm"
              checked={form.consentFirm}
              onChange={handleChange}
            />
          }
          label="Souhlas firmy/pacienta"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="consentDoctor"
              checked={form.consentDoctor}
              onChange={handleChange}
            />
          }
          label="Souhlas lékaře"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          Uložit záznam
        </Button>
      </form>
    </Box>
  );
};

export default AddRecordPage;
