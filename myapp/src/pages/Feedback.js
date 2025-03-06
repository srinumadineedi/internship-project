import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";

const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar({ open: true, message: "Feedback submitted successfully!", severity: "success" });
  };

  return (
    <Container maxWidth="sm" className="mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Typography variant="h4" fontWeight="bold" textAlign="center" className="mb-4">
        Feedback
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="space-y-4">
        <TextField fullWidth label="Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <TextField fullWidth label="Email" type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <TextField fullWidth multiline rows={4} label="Your Feedback" required onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
        <Button type="submit" variant="contained" fullWidth className="bg-blue-500 hover:bg-blue-600">
          Submit
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Feedback;
