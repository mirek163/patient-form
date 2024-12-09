import React, { useState, useEffect } from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import PatientListPage from "../components/PatientList/PatientListTable";
import axios from "axios";


const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get("http://localhost:5000/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Chyba při získávání pacianta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div>Načítání...</div>; 
  }

  return (
    <PageWrapper>
      <PatientListPage patients={patients} />
    </PageWrapper>
  );
};

export default PatientList;
