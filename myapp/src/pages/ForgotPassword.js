import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Modal } from "@mui/material";
import axios from "axios";

const ForgotPassword = ({ open, onClose }) => {
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Reset Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Forgot Password Request (Step 1)
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setError("Please enter your email.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email: forgotEmail });

      setMessage("A reset token has been sent to your email.");
      setError("");
      setStep(2); // ✅ Move to Step 2
    } catch (err) {
      setError(err.response?.data?.message || "User not found.");
      setMessage("");
    }
  };

  // ✅ Handle Reset Password Request (Step 2)
  const handleResetPassword = async () => {
    // Check if all fields are filled
    if (!forgotEmail.trim() || !resetToken.trim() || !newPassword.trim()) {
      setError("⚠️ Email, reset token, and new password are required.");
      setMessage(""); // Clear success message
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: forgotEmail.trim(), 
        resetToken: resetToken.trim(),  // 🔹 Ensure it's `resetToken`, not `reset_token`
        newPassword: newPassword.trim(),
      });
  
      // If successful
      setMessage("✅ Password reset successful! You can now log in.");
      setError(""); // Clear errors
  
      // ✅ Reset input fields and close modal after success message
      setTimeout(() => {
        setStep(1);
        setForgotEmail("");
        setResetToken("");
        setNewPassword("");
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data);
  
      // Handle different error cases
      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid token or expired.");
      } else {
        setError("❌ Server error. Please try again later.");
      }
  
      setMessage(""); // Clear success message
    }
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "white", boxShadow: 24, p: 4, borderRadius: 3 }}>
        <Typography variant="h6" textAlign="center">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </Typography>

        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {step === 1 ? (
          <>
            <TextField fullWidth variant="outlined" label="Enter Your Email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} sx={{ mt: 2, mb: 2 }} />
            <Button fullWidth variant="contained" color="primary" onClick={handleForgotPassword}>Send Reset Link</Button>
          </>
        ) : (
          <>
            <TextField fullWidth variant="outlined" label="Email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} sx={{ mt: 2 }} />
            <TextField fullWidth variant="outlined" label="Reset Token" value={resetToken} onChange={(e) => setResetToken(e.target.value)} sx={{ mt: 2 }} />
            <TextField fullWidth variant="outlined" label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ mt: 2, mb: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="outlined" color="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleResetPassword}>Reset Password</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ForgotPassword;
