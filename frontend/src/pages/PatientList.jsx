import React, { useState, useEffect } from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import PatientListPage from "../components/PatientList/PatientListTable";
import axios from "axios";
import { useParams } from "react-router-dom";

const PatientList = () => {
  const { workerId } = useParams(); // Get workerId from the route
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("authToken");
        let endpoint = "http://localhost:5000/patients";
        if (workerId) {
          endpoint += `?workerId=${workerId}`;
        }

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [workerId]);

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
