import React, { useState, useEffect } from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import UserListTable from "../components/UserList/UserListTable";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const confirmation = window.confirm("Chcete opravdu změnit roli u uživatele?");
    if (!confirmation) return; // Potvrzení
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Opravdu chcete smazat tohoto uživatele?");
    if (!confirmation) return;  // Potvrzení
  
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Odstran uzivatele
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <UserListTable
        users={users}
        onRoleChange={handleRoleChange}
        onDeleteUser={handleDeleteUser}
      />
    </PageWrapper>
  );
};

export default UserList;
