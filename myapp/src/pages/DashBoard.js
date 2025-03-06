import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, ArrowBack, CameraAlt, Save } from "@mui/icons-material";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    profilePic: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUserData();
  }, []);

// ✅ Fetch User Data
      const fetchUserData = async () => {
          try {
              const token = localStorage.getItem("token");
              const response = await axios.get("http://localhost:5000/api/users/profile", {
                  headers: { Authorization: `Bearer ${token}` },
              });

              console.log("🔹 User Data Retrieved:", response.data);

              setUserData({
                  fullName: response.data.full_name || "",
                  email: response.data.email || "",
                  profilePic: response.data.profile_pic || "", // ✅ Ensure profile pic is set
              });

              // ✅ Store the latest profile picture in localStorage for persistence
              if (response.data.profile_pic) {
                  localStorage.setItem("profilePic", response.data.profile_pic);
              }
          } catch (error) {
              console.error("❌ Error fetching user:", error);
              setMessage({ type: "error", text: "Failed to load user data." });
          }
        };

// ✅ Handle Profile Picture Upload
const handleProfilePicUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profilePic", file);

  try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/users/profile/upload", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.status === 200) {
          console.log("🔹 Profile Picture Updated:", response.data);

          // ✅ Immediately update state and store in localStorage
          const newProfilePic = response.data.profilePic;
          setUserData((prev) => ({
              ...prev,
              profilePic: newProfilePic, // ✅ Ensure new profile picture is set
          }));
          localStorage.setItem("profilePic", newProfilePic);

          setMessage({ type: "success", text: "Profile picture updated successfully!" });
      } else {
          setMessage({ type: "error", text: `Failed to upload profile picture: ${response.statusText}` });
      }
  } catch (error) {
      console.error("❌ Error uploading profile picture:", error);
      setMessage({ type: "error", text: "Failed to upload profile picture." });
  }
};

  // ✅ Save Edited Profile
  
              const handleSaveProfile = async () => {
                try {
                    const token = localStorage.getItem("token");

                    // ✅ Keep existing profile picture if not updating it
                    const updatedProfile = {
                        full_name: userData.fullName,
                        email: userData.email,
                        profile_pic: userData.profilePic || "", // Preserve existing profile pic
                    };

                    const response = await axios.put("http://localhost:5000/api/users/profile", updatedProfile, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.status === 200) {
                        setMessage({ type: "success", text: "Profile updated successfully!" });
                        setIsEditing(false);

                        // ✅ Update state without removing profile picture
                        setUserData((prev) => ({
                            ...prev,
                            fullName: response.data.user.full_name,
                            email: response.data.user.email,
                            profilePic: response.data.user.profile_pic || prev.profilePic, // ✅ Keep profile picture if not updated
                        }));
                    }
                } catch (error) {
                    console.error("❌ Error updating profile:", error);
                    setMessage({ type: "error", text: "Failed to update profile." });
                }
            };

// ✅ Navigate home
          const handleNavigateHome = () => {
            navigate("/home");
          };

          return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                User Dashboard
              </Typography>

              {message.text && <Alert severity={message.type}>{message.text}</Alert>}

              {/* Profile Picture */}
              <label htmlFor="upload-profile-pic">
              <Avatar
                  src={userData.profilePic || "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png"}
                  sx={{ width: 100, height: 100, mx: "auto", mt: 3, cursor: "pointer" }}
              />

                {isEditing && (
                  <CameraAlt
                    sx={{
                      position: "relative",
                      top: "-30px",
                      left: "35px",
                      cursor: "pointer",
                      color: "#007bff",
                    }}
                  />
                )}
              </label>

              {/* Hidden File Input for Upload */}
              {isEditing && (
                      <input
                      type="file"
                      id="upload-profile-pic"
                      style={{ display: "none" }}
                      onChange={handleProfilePicUpload} // ✅ Ensure file upload works
                  />
                  
              )}

              {isEditing ? (
                <>
                  {/* Edit Profile Inputs */}
                  <TextField
                    label="Full Name"
                    value={userData.fullName}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    fullWidth
                    sx={{ mt: 2 }}
                  />

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={handleSaveProfile}
                      sx={{ justifyContent: "center", mt: 4 }}
                    >
                      Save Information
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {userData.fullName}
                  </Typography>
                  <Typography variant="body2">{userData.email}</Typography>
                </>
              )}

              {/* Quick Access Buttons */}
              <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={cardStyle} onClick={() => setIsEditing(true)}>
                    <CardContent>
                      <Edit fontSize="large" color="primary" />
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        Edit Profile
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={cardStyle} onClick={handleNavigateHome}>
                    <CardContent>
                      <ArrowBack fontSize="large" sx={{ color: "#ff9800" }} />
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        Back to Home
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          );
        };

        const cardStyle = { textAlign: "center", p: 2, cursor: "pointer" };

        export default Dashboard;
