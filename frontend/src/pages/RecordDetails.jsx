import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/Shared/PageWrapper";
import RecordDetailsPage from "../components/RecordDetails/RecordDetailsForm";

const MOCK_PATIENT_RECORDS = {
  1: {
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
    consents: { firm: true, doctor: true },
  },
  2: {
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
};

const RecordDetails = () => {
  const { recordId } = useParams(); 
  const record = MOCK_PATIENT_RECORDS[recordId]; 

  return (
    <PageWrapper>
      <RecordDetailsPage record={record} />
    </PageWrapper>
  );
};

export default RecordDetails;
