import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Input, Avatar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PetRegistration = () => {
    const navigate = useNavigate();
    const [petData, setPetData] = useState({
        name: "",
        breed: "",
        age: "",
        gender: "",
        temperament: "",
        health_status: "",
        food: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setPetData({ ...petData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file)); // Show preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        const formData = new FormData();
        Object.keys(petData).forEach((key) => formData.append(key, petData[key]));
        if (profilePic) formData.append("profile_pic", profilePic);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage({ type: "error", text: "Authentication error. Please log in again." });
                return;
            }

            await axios.post("http://localhost:5000/api/pets", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage({ type: "success", text: "Pet registered successfully!" });
            setPetData({
                name: "",
                breed: "",
                age: "",
                gender: "",
                temperament: "",
                health_status: "",
                food: "",
            });
            setProfilePic(null);
            setPreview(null);
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to register pet." });
        }
    };

    return (
        <Card sx={{ mt: 2, p: 3, maxWidth: 500, mx: "auto" }}>
            <CardContent>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Register a New Pet
                </Typography>

                {message.text && <Alert severity={message.type}>{message.text}</Alert>}

                <Avatar src={preview || "/default-avatar.png"} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
                <Input type="file" onChange={handleFileChange} sx={{ mb: 2 }} />

                <TextField label="Name" name="name" onChange={handleChange} value={petData.name} fullWidth sx={{ mb: 2 }} />
                <TextField label="Breed" name="breed" onChange={handleChange} value={petData.breed} fullWidth sx={{ mb: 2 }} />
                <TextField label="Age" name="age" type="number" onChange={handleChange} value={petData.age} fullWidth sx={{ mb: 2 }} />
                <TextField label="Gender" name="gender" onChange={handleChange} value={petData.gender} fullWidth sx={{ mb: 2 }} />
                <TextField label="Food" name="food" onChange={handleChange} value={petData.food} fullWidth sx={{ mb: 2 }} />
                <TextField label="Temperament" name="temperament" onChange={handleChange} value={petData.temperament} fullWidth sx={{ mb: 2 }} />
                <TextField label="Health Status" name="health_status" onChange={handleChange} value={petData.health_status} fullWidth sx={{ mb: 2 }} />

                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mb: 2 }}>
                    Register Pet
                </Button>

                {/* Back to Home Button */}
                <Button variant="outlined" color="secondary" onClick={() => navigate("/home")} fullWidth>
                    Back to Home
                </Button>
            </CardContent>
        </Card>
    );
};

export default PetRegistration;
