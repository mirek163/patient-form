import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper, Collapse } from "@mui/material";
import "./AddPatientStyles.css";

const AddPatientPage = () => {
  const [form, setForm] = useState({
    name: "",
    idNumber: "",
    address: "",
    insurance: "",
    doctorName: "",
    doctorContact: "",
    specialistName: "",
    specialistContact: "",
    specialistNurse: "",
    representativeFields: [{ name: "", surname: "", contact: "" }],
    showADP: false,
    showReps: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRepChange = (index, e) => {
    const { name, value } = e.target;
    const newReps = [...form.representativeFields];
    newReps[index][name] = value;
    setForm((prev) => ({ ...prev, representativeFields: newReps }));
  };

  const addRepresentative = () => {
    setForm((prev) => ({
      ...prev,
      representativeFields: [...prev.representativeFields, { name: "", surname: "", contact: "" }],
    }));
  };

  const removeRepresentative = (index) => {
    const newReps = form.representativeFields.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, representativeFields: newReps }));
  };

  const toggleADP = () => {
    setForm((prev) => ({ ...prev, showADP: !prev.showADP }));
  };

  const toggleReps = () => {
    setForm((prev) => ({ ...prev, showReps: !prev.showReps }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Odeslaná data pacienta:", form);
    alert("Pacient byl přidán.");
    setForm({
      name: "",
      idNumber: "",
      address: "",
      insurance: "",
      doctorName: "",
      doctorContact: "",
      specialistName: "",
      specialistContact: "",
      specialistNurse: "",
      representativeFields: [{ name: "", surname: "", contact: "" }],
      showADP: false,
      showReps: false,
    });
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Přidat nového pacienta
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        
        <form onSubmit={handleSubmit}>
          {/* Základní informace */}
          <Typography variant="h6" gutterBottom>
            Základní informace
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <TextField
              label="Jméno a příjmení"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Rodné číslo"
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Adresa"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Zdravotní pojišťovna"
              name="insurance"
              value={form.insurance}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>

          {/* Praktický lékař */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Praktický lékař
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <TextField
              label="Jméno lékaře"
              name="doctorName"
              value={form.doctorName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Kontakt lékaře"
              name="doctorContact"
              value={form.doctorContact}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* ADP sekce */}
          <Box style={{ marginTop: "20px" }}>
            <Button onClick={toggleADP} variant="outlined" fullWidth>
              {form.showADP ? "Skrýt ADP" : "Zobrazit ADP"}
            </Button>
            <Collapse in={form.showADP}>
              <Box display="flex" flexWrap="wrap" gap={2} style={{ marginTop: "10px" }}>
                <Box display="flex" gap={2} style={{ flex: 1 }}>
                  <TextField
                    label="Název ADP"
                    name="specialistName"
                    value={form.specialistName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Kontakt ADP"
                    name="specialistContact"
                    value={form.specialistContact}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Vedoucí sestra"
                    name="specialistNurse"
                    value={form.specialistNurse}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Box>
            </Collapse>
          </Box>

          {/* Reprezentanti */}
          <Box style={{ marginTop: "20px" }}>
            <Button onClick={toggleReps} variant="outlined" fullWidth>
              {form.showReps ? "Skrýt reprezentanty" : "Zobrazit reprezentanty"}
            </Button>
            <Collapse in={form.showReps}>
              {form.representativeFields.map((rep, index) => (
                <Box display="flex" flexWrap="wrap" gap={2} key={index} style={{ marginTop: "10px" }}>
                  <Box display="flex" gap={2} style={{ flex: 1 }}>
                    <TextField
                      label="Jméno"
                      name="name"
                      value={rep.name}
                      onChange={(e) => handleRepChange(index, e)}
                      fullWidth
                    />
                    <TextField
                      label="Příjmení"
                      name="surname"
                      value={rep.surname}
                      onChange={(e) => handleRepChange(index, e)}
                      fullWidth
                    />
                    <TextField
                      label="Kontakt"
                      name="contact"
                      value={rep.contact}
                      onChange={(e) => handleRepChange(index, e)}
                      fullWidth
                    />
                  </Box>
                  <Button
                    onClick={() => removeRepresentative(index)}
                    variant="outlined"
                    color="error"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    Odebrat reprezentanta
                  </Button>
                </Box>
              ))}
              <Button
                onClick={addRepresentative}
                variant="outlined"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Přidat dalšího reprezentanta
              </Button>
            </Collapse>
          </Box>

          {/* Uložit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "12px", marginTop: "20px" }}
          >
            Uložit pacienta
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddPatientPage;
