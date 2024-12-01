import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import "./AuthStyles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Zatím Mock data: 
    //s rolemi: doctor@test.cz, nurse@test.cz bez rolí user@test.cz
    if (email === "doctor@test.cz") {
      login("doctor");
    } else if (email === "nurse@test.cz") {
      login("nurse");
    } else if (email === "user@test.cz") {
      login("user");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box className="auth-container">
      <Typography variant="h4" gutterBottom>
        Přihlášení
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Heslo"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Přihlásit
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
