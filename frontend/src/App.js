import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientList from "./pages/PatientList";
import PatientDetails from "./pages/PatientDetails";
import RecordDetails from "./pages/RecordDetails"; 
import AddRecord from "./pages/AddRecord";
import AddPatient from "./pages/AddPatient";
import ProtectedRoute from "./components/Shared/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Zabezpečení routes */}
      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <PatientList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/add"
        element={
          <ProtectedRoute>
            <AddPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:patientId"
        element={
          <ProtectedRoute>
            <PatientDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:patientId/add-record"
        element={
          <ProtectedRoute>
            <AddRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:patientId/records/:recordId"
        element={
          <ProtectedRoute>
            <RecordDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
