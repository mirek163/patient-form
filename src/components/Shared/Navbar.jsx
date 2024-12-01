import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import "./SharedStyles.css";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="navbar-title">
          Zdravotní záznamy
        </Typography>
        <Button color="inherit" onClick={logout}>
          Odhlásit se
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
