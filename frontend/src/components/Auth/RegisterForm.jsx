import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import "./AuthStyles.css";

const RegisterForm = () => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Hesla se neshodují");
      return;
    }
    try {
      await axios.post("http://localhost:5000/auth/register", form);
      alert("Úspěšná registrace!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;
        if (errors) {
          alert(errors.map(err => err.msg).join("\n"));
        } else if (message) {
          alert(message);
        } else {
          alert("Chyba při registraci");
        }
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <Box className="auth-container">
      <Typography variant="h4" gutterBottom>Registrace</Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Heslo" type="password" fullWidth margin="normal" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <TextField label="Potvrzení hesla" type="password" fullWidth margin="normal" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Registrovat</Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
