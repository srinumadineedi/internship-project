import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser, getReports } from "../api";
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, 
    DialogContent, DialogTitle, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";  // ✅ Back button navigation

const AdminDashboard = () => {
    const navigate = useNavigate();  // ✅ For Back Button
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");

    useEffect(() => {
        loadUsers();
        loadReports();
    }, []);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const loadReports = async () => {
        const data = await getReports();
        setReports(data);
    };

    const handleDelete = async (userId) => {
        await deleteUser(userId);
        loadUsers(); // Refresh users list
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
        setUpdatedRole(user.role);
        setOpen(true);
    };

    const handleUpdate = async () => {
        if (selectedUser) {
            await updateUser(selectedUser.user_id, { name: updatedName, email: updatedEmail, role: updatedRole });
            setOpen(false);
            loadUsers();
        }
    };

    return (
        <Container maxWidth="lg">
            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                variant="contained"
                color="secondary"
                onClick={() => navigate("/home")}
                sx={{ mt: 3 }}
            >
                Back to Home
            </Button>

            <Typography variant="h4" gutterBottom sx={{ mt: 4, textAlign: "center", fontWeight: "bold" }}>
                Admin Dashboard
            </Typography>

            {/* User Management */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: "bold" }}>Users</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Role</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(user.user_id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Reports Section */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: "bold" }}>System Reports</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Action</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Timestamp</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.log_id}>
                                <TableCell>{report.action}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit User Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} sx={{ mt: 2 }} />
                    <TextField fullWidth label="Email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} sx={{ mt: 2 }} />
                    <TextField fullWidth label="Role" value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)} sx={{ mt: 2 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminDashboard;
