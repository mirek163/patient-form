import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./AuthStyles.css";

const RegisterPage = () => {
  return (
    <Box className="auth-container">
      <Typography variant="h4" gutterBottom>
        Registrace
      </Typography>
      <form>
      <TextField label="Jméno" fullWidth margin="normal" required />
        <TextField label="Email" fullWidth margin="normal" required />
        <TextField label="Heslo" type="password" fullWidth margin="normal" required />
        <TextField label="Potvrzení hesla" type="password" fullWidth margin="normal" required />
        <Button variant="contained" color="primary" fullWidth>
          Registrovat
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
