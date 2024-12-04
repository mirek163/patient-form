import React, { useState, useEffect } from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import PatientListPage from "../components/PatientList/PatientListTable";
import axios from "axios";


// const MOCK_PATIENTS = [
//   {
//     id: 1,
//     name: "John Doe",
//     idNumber: "123456789",
//     address: "123 Fake Street",
//     insurance: "VZP",
//     doctor: { name: "Dr. Alice Smith", contact: "420-123-456" },
//     specialist: { name: "Clinic ABC", contact: "420-987-654", headNurse: "Nurse Kelly" },
//     representatives: [
//       { name: "Jane Doe", contact: "420-654-321" },
//       { name: "Jake Doe", contact: "420-321-987" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     idNumber: "987654321",
//     address: "456 Real Avenue",
//     insurance: "ČPZP",
//     doctor: { name: "Dr. Bob Johnson", contact: "420-111-222" },
//     specialist: { name: "Clinic XYZ", contact: "420-333-444", headNurse: "Nurse Anna" },
//     representatives: [{ name: "John Smith", contact: "420-777-888" }],
//   },
// ];
// const PatientList = () => {
//   return (
//     <PageWrapper>
//       <PatientListPage patients={MOCK_PATIENTS}/>
//     </PageWrapper>
//   );
// };

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
        console.error("Error fetching patients:", error);
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
