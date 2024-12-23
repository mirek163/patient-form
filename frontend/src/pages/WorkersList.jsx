import React, { useState, useEffect } from "react";
import PageWrapper from "../components/Shared/PageWrapper";
import WorkersListPage from "../components/WorkersList/WorkersListPage";
import axios from "axios";

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/workers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <PageWrapper>
      <WorkersListPage workers={workers} loading={loading} />
    </PageWrapper>
  );
};

export default WorkersList;
