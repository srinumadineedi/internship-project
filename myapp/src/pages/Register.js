import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import styled from "styled-components";

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "", // ✅ Changed to match backend
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name, // ✅ Changed to match backend
          email: formData.email,
          password: formData.password,
          role: "user", // ✅ Required by backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration Successful! Redirecting...");
        setError("");

        // Clear form fields
        setFormData({
          full_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login"); // ✅ Delayed redirect
        }, 1500);
      } else {
        setError(data.message || "Registration failed");
        setSuccess("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <FormContainer maxWidth="xs">
      <Box sx={{ background: "white", padding: 4, borderRadius: 3, boxShadow: 3, width: "100%" }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Create Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name" // ✅ Changed to match backend
            value={formData.full_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <StyledButton variant="contained" color="primary" type="submit">
            Register
          </StyledButton>
        </form>

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Already registered?
          <Button onClick={() => navigate("/login")} color="primary">
            Login
          </Button>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default Register;
