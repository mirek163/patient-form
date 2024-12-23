import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import "./UserListTable.css";

const UserListTable = ({
  noRoleUsers = [],
  workersWithoutdoctor = [],
  doctorsWithWorkers = [],
  onRoleChange,
  onDeleteUser,
}) => {
  return (
    <Box className="user-list-container">

      <Paper className="user-list-table" elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>

        {/* doktoři s pečovateli */}
        <Typography variant="h5" style={{ marginTop: "16px" }}>
          Pracovníci:
        </Typography>
        {doctorsWithWorkers.length === 0 ? (
          <Typography variant="body1" className="empty-message">
            Žádný doktor nebyl nalezen.
          </Typography>
        ) : (
          doctorsWithWorkers.map((doctor) => (
            <Box
              key={doctor.user_id}
              className="doctor-container"
              style={{
                backgroundColor: "#f9f9f9",
                marginBottom: "16px",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <Grid container className="user-list-row doctor-row" style={{ alignItems: "center" }}>
                <Grid item xs={3}>
                  <Typography variant="h6">{doctor.email} </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Select
                    value={doctor.role || ""}
                    onChange={(e) => onRoleChange(doctor.user_id, e.target.value)}
                    style={{ minWidth: "140px" }}
                  >
                    <MenuItem value="master">master</MenuItem>
                    <MenuItem value="doctor">doktor</MenuItem>
                    <MenuItem value="worker">pečovatel</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onDeleteUser(doctor.user_id)}
                    style={{ marginRight: "8px" }}
                  >
                    Smazat
                  </Button>
                </Grid>
              </Grid>

              {/* Přiřazení role pečovatlei*/}
              {doctor.assignedworkers?.map((assignment) => (
                <Grid
                  container
                  key={assignment.worker.user_id}
                  className="user-list-row worker-row"
                  style={{
                    padding: "8px 16px",
                    marginTop: "8px",
                    backgroundColor: "#ffffff",
                    borderRadius: "4px",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={3}>
                    <Typography style={{ fontSize: "0.9rem" }}>
                      {assignment.worker.email} 
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      value={assignment.worker.role || ""}
                      onChange={(e) => onRoleChange(assignment.worker.user_id, e.target.value)}
                      style={{ minWidth: "120px" }}
                    >
                      <MenuItem value="master">master</MenuItem>
                      <MenuItem value="doctor">doktor</MenuItem>
                      <MenuItem value="worker">pečovatel</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => onDeleteUser(assignment.worker.user_id)}
                      style={{ marginRight: "8px", fontSize: "0.8rem" }}
                    >
                      Smazat
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default UserListTable; 