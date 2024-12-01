import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

const PageWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box style={{ minHeight: "80vh" }}>{children}</Box>
      <Footer />
    </>
  );
};

export default PageWrapper;
