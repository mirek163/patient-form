import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/Shared/PageWrapper";
import PatientDetailsPage from "../components/PatientDetails/PatientDetailsForm";

const MOCK_PATIENTS = {
  1: {
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
    records: [
      {
        id: 1,
        author: "Dr. Alice Smith",
        date: "2024-11-01",
        time: "14:30",
        diagnosis: { code: "MKN11-001", description: "Diabetes-related ulcer" },
        anamnesis: { comorbidities: "Diabetes, Hypertension", social: "Non-smoker" },
        wound: {
          location: "Right leg",
          lateralization: "Right",
          size: "3x4x2 cm",
          bedColor: "Pink",
          edges: "Smooth",
          secretion: "Moderate",
          odor: "Foul",
          surroundingTissue: "Inflamed",
        },
        photos: ["photo1.jpg", "photo2.jpg"],
        referral: "Code-1234",
        consents: { firm: true, doctor: true },
      },
      {
        id: 2,
        author: "Dr. Bob Johnson",
        date: "2024-15-02",
        time: "10:15",
        diagnosis: { code: "MKN11-002", description: "Pressure sore" },
        anamnesis: { comorbidities: "Chronic kidney disease", social: "Occasional smoker" },
        wound: {
          location: "Left arm",
          lateralization: "Left",
          size: "5x6x1 cm",
          bedColor: "Red",
          edges: "Irregular",
          secretion: "Low",
          odor: "None",
          surroundingTissue: "Swollen",
        },
        consents: { firm: false, doctor: true },
      },
    ],
  },
  2: {
    id: 2,
    name: "Jane Doe",
    idNumber: "987654321",
    address: "456 Real Street",
    insurance: "XYZ",
    doctor: { name: "Dr. Bob Johnson", contact: "420-222-333" },
    specialist: { name: "Clinic DEF", contact: "420-444-420", headNurse: "Nurse Adams" },
    representatives: [
      { name: "Mark Doe", contact: "420-111-222" },
      { name: "Lucy Doe", contact: "420-333-444" },
    ],
    records: [
      {
        id: 1,
        author: "Dr. Bob Johnson",
        date: "2024-12-01",
        time: "09:00",
        diagnosis: { code: "MKN11-003", description: "Post-surgical infection" },
        anamnesis: { comorbidities: "Obesity", social: "Non-smoker" },
        wound: {
          location: "Abdomen",
          lateralization: "None",
          size: "7x8x3 cm",
          bedColor: "Yellow",
          edges: "Smooth",
          secretion: "High",
          odor: "None",
          surroundingTissue: "Red and inflamed",
        },
        photos: ["photo3.jpg", "photo4.jpg"],
        referral: "Code-5678",
        consents: { firm: true, doctor: false },
      },
    ],
  },
};

const PatientDetails = () => {
  const { id } = useParams(); // id z routy
  const patient = MOCK_PATIENTS[id];

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <PageWrapper>
      <PatientDetailsPage patient={patient} />
    </PageWrapper>
  );
};

export default PatientDetails;
