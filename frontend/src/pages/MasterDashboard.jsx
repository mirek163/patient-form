import React, { useState, useEffect } from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import UserListTable from "../components/UserList/UserListTable";
import axios from "axios";

const UserList = () => {
  console.log("UserList Component Mounted");
  const [doctors, setdoctors] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    console.log("Fetching users...");
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("API Response:", response.data);
      const { noRoleUsers, nesezeni, doctorsWithWorkers } = response.data;
      setdoctors({ noRoleUsers, nesezeni, doctorsWithWorkers });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setdoctors({ noRoleUsers: [], nesezeni: [], doctorsWithWorkers: [] });
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleRoleChange = async (userId, newRole) => {
    const confirmation = window.confirm(
      "Chcete opravdu změnit roli u uživatele?"
    );
    if (!confirmation) return;
  
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` },
      });
  

      await fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error.message);
    }
  };
  
  

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm(
      "Opravdu chcete smazat tohoto uživatele?"
    );
    if (!confirmation) return;
  
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  

      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Načítání...</div>;
  }

  return (
    <PageWrapper>
      <UserListTable
        noRoleUsers={doctors.noRoleUsers || []} 
        workersWithoutdoctor={doctors.workersWithoutdoctor || []}
        doctorsWithWorkers={doctors.doctorsWithWorkers || []}
        onRoleChange={handleRoleChange}
        onDeleteUser={handleDeleteUser}
/>
    </PageWrapper>
  );
};

export default UserList;
