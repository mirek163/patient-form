import React from "react";
import { Box, Typography } from "@mui/material";
import "./SharedStyles.css";

const Footer = () => {
  return (
    <Box className="footer-container">
      <Typography variant="body2" align="center">
        © 2024 patička-test: Zdravotní záznamy.
      </Typography>
    </Box>
  );
};

export default Footer;
