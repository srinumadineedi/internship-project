import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Avatar, Grid } from "@mui/material";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle profile picture upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Updated Profile:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" marginBottom={2}>
          Profile Settings
        </Typography>

        {/* Profile Picture Upload */}
        <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
          <Avatar src={preview || "/default-profile.png"} sx={{ width: 100, height: 100 }} />
        </Grid>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {/* User Form */}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Full Name" name="fullName" variant="outlined" margin="normal" value={formData.fullName} onChange={handleChange} required />
          <TextField fullWidth label="Email" name="email" type="email" variant="outlined" margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth label="New Password" name="password" type="password" variant="outlined" margin="normal" value={formData.password} onChange={handleChange} />
          <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" variant="outlined" margin="normal" value={formData.confirmPassword} onChange={handleChange} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Update Profile
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfileSettings;
