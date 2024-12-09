import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageWrapper from "../components/Shared/PageWrapper";
import RecordDetailsPage from "../components/RecordDetails/RecordDetailsForm";

const RecordDetails = () => {
  const { patientId, recordId } = useParams(); 
  //console.log("Patient ID:", patientId);
  //console.log("Record ID:", recordId);  
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        const response = await axios.get(`http://localhost:5000/patients/${patientId}/records/${recordId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecord(response.data); 
      } catch (err) {
        console.error("Chyba získání záznamu::", err.message); 
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [patientId, recordId]);

  if (loading) {
    return <div>Načítání...</div>;
  }

  return (
    <PageWrapper>
      <RecordDetailsPage record={record} />
    </PageWrapper>
  );
};

export default RecordDetails;
