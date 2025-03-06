import React, { useState } from "react";
import { Container, Grid, TextField, Button, Typography, Card, CardMedia, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [open, setOpen] = useState(false); // ✅ Control Forgot Password Modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          // ✅ Decode token to check expiration
          const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
          console.log("🔑 Decoded Token:", decodedToken);

          // ✅ Store token in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("token_expiry", decodedToken.exp); // Store expiry time

          setSuccess("Login Successful! Redirecting...");
          setTimeout(() => {
            navigate("/home"); // ✅ Redirect to home page after login
          }, 1500);
        } else {
          setError("Login successful, but no token received.");
        }
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    }
  };

  // ✅ Auto Logout if Token is Expired
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("token_expiry");

    if (token && tokenExpiry) {
      const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

      if (currentTime > tokenExpiry) {
        console.log("🔴 Token expired, logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: "#EEF2FF", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="md">
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          {/* Left Side - Image & Quote */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="350"
                image="https://cdn.pixabay.com/photo/2023/07/07/15/24/corgi-8112816_1280.jpg"
                alt="Random Pet"
              />
              <Box sx={{ padding: 2, textAlign: "center", backgroundColor: "#4A4EB7", color: "white" }}>
                <Typography variant="h6">"Discover The Best Matches For Your Pets and Connect With Other Pet Lovers!"</Typography>
              </Box>
            </Card>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: "#ffffff", padding: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Log in
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />

              <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>Log in</Button>

              {/* Forgot Password Link */}
              <Typography textAlign="right" sx={{ marginTop: 1 }}>
                <Button variant="text" color="primary" onClick={() => setOpen(true)}>Forgotten password?</Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ✅ Forgot Password Modal */}
      <ForgotPassword open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Login;
