import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, 
  DialogContent, DialogTitle, TextField, Snackbar, Alert
} from "@mui/material";
import { Edit, Delete, Add, ArrowBack } from "@mui/icons-material";
import styled from "styled-components";

const UserContainer = styled(Container)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  position: relative;
`;

const BackButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #4a90e2;
  color: white;
  &:hover {
    background: #357abd;
  }
`;

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ full_name: "", email: "", role: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch Users from Backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("❌ Error fetching users:", error.message);
    }
  };

  // ✅ Open Dialog for Add/Edit
  const handleOpen = (user = null) => {
    setEditingUser(user);
    setFormData(user ? { ...user, password: "" } : { full_name: "", email: "", role: "", password: "" });
    setOpen(true);
  };

  // ✅ Close Dialog
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  // ✅ Save or Update User
  const handleSave = async () => {
    try {
      const requestOptions = {
        method: editingUser ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          role: formData.role,
          ...(editingUser ? {} : { password: formData.password }) // ✅ Send password only when adding a new user
        }),
      };

      const url = editingUser
        ? `http://localhost:5000/api/admin/users/${editingUser.user_id}`  
        : "http://localhost:5000/api/admin/users";

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save user");
      }

      fetchUsers();
      handleClose();

      // ✅ Show success message
      setSnackbar({
        open: true,
        message: editingUser ? "User updated successfully!" : "User created successfully!",
        severity: "success"
      });

    } catch (error) {
      console.error("❌ Error saving user:", error.message);
      setSnackbar({
        open: true,
        message: "Error saving user",
        severity: "error"
      });
    }
  };

  // ✅ Delete User
  const handleDelete = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${user_id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");

      fetchUsers();

      // ✅ Show success message
      setSnackbar({
        open: true,
        message: "User deleted successfully!",
        severity: "success"
      });

    } catch (error) {
      console.error("❌ Error deleting user:", error.message);
      setSnackbar({
        open: true,
        message: "Error deleting user",
        severity: "error"
      });
    }
  };

  return (
    <UserContainer maxWidth="md">
      {/* 🔙 Back to Home Button */}
      <BackButton onClick={() => navigate("/home")}>
        <ArrowBack />
      </BackButton>

      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        User Management (Admin)
      </Typography>

      {/* ➕ Add User Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ marginBottom: "1rem" }}
      >
        Add User
      </Button>

      {/* 📋 User List Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Full Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpen(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user.user_id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📝 Add/Edit User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            margin="dense"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          {!editingUser && (
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="dense"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editingUser ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </UserContainer>
  );
};

export default UserManagement;
