import React from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import PatientListPage from "../components/PatientList/PatientListTable";

const MOCK_PATIENTS = [
  {
    id: 1,
    name: "John Doe",
    idNumber: "123456789",
    address: "123 Fake Street",
    insurance: "VZP",
    doctor: { name: "Dr. Alice Smith", contact: "420-123-456" },
    specialist: { name: "Clinic ABC", contact: "420-987-654", headNurse: "Nurse Kelly" },
    representatives: [
      { name: "Jane Doe", contact: "420-654-321" },
      { name: "Jake Doe", contact: "420-321-987" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    idNumber: "987654321",
    address: "456 Real Avenue",
    insurance: "ČPZP",
    doctor: { name: "Dr. Bob Johnson", contact: "420-111-222" },
    specialist: { name: "Clinic XYZ", contact: "420-333-444", headNurse: "Nurse Anna" },
    representatives: [{ name: "John Smith", contact: "420-777-888" }],
  },
];

const PatientList = () => {
  return (
    <PageWrapper>
      <PatientListPage patients={MOCK_PATIENTS}/>
    </PageWrapper>
  );
};

export default PatientList;
