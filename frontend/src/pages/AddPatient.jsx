import React from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import AddRecordForm from "../components/AddPatient/AddPatientForm";

const AddPatient = ({ patient }) => {
  return (
    <PageWrapper>
      <AddRecordForm patient={patient}/>
    </PageWrapper>
  );
};

export default AddPatient;


