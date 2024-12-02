import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AuthStyles.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

 // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Zatím Mock data: 
  //   //s rolemi: doctor@test.cz, nurse@test.cz bez rolí user@test.cz
  //   if (email === "doctor@test.cz") {
  //     login("doctor");
  //   } else if (email === "nurse@test.cz") {
  //     login("nurse");
  //   } else if (email === "user@test.cz") {
  //     login("user");
  //   } else {
  //     alert("Špatné údaje");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
      const { token, user } = response.data;
      login(user.role, token);
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;
        if (errors) {
          alert(errors.map(err => err.msg).join("\n"));
        } else if (message){
          alert(message);
        } else {
          alert("Chyba při přihlašování");
        }
      } else {
        alert("Server error");
      }
    }
  };

  const handleNewAccount = () => {
    navigate("/register");
  };

  return (
    <Box className="auth-container">
      <Typography variant="h4" gutterBottom>Přihlášení</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Heslo" type="password" fullWidth margin="normal" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Přihlásit</Button>
      </form>
      <form onClick={handleNewAccount}>
      <Button type="submit" variant="contained" color="inherit" sx={{ marginTop: 1 }} fullWidth>Chci se registrovat</Button>
      </form>

    </Box>
  );
};

export default LoginForm;
