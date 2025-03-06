import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Input, Avatar, Alert } from "@mui/material";
import axios from "axios";

const PetEdit = ({ pet, fetchPets, setSelectedPet }) => {
    const [petData, setPetData] = useState({ ...pet });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(pet?.profile_pic ? `http://localhost:5000${pet.profile_pic}` : "/default-avatar.png");
    const [message, setMessage] = useState({ type: "", text: "" });

    // ✅ Update state when `pet` changes
    useEffect(() => {
        if (pet) {
            setPetData({ ...pet });
            setPreview(pet.profile_pic ? `http://localhost:5000${pet.profile_pic}` : "/default-avatar.png");
        }
    }, [pet]);

    const handleChange = (e) => {
        setPetData({ ...petData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setPreview(URL.createObjectURL(file)); // ✅ Show preview before upload
    };

    const handleUpdate = async () => {
        setMessage({ type: "", text: "" });

        try {
            let uploadedPic = petData.profile_pic;

            if (file) {
                const formData = new FormData();
                formData.append("profile_pic", file);

                const uploadResponse = await axios.post("http://localhost:5000/api/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                uploadedPic = uploadResponse.data.profile_pic;
            }

            const updatedPetData = { ...petData, profile_pic: uploadedPic };

            await axios.put(`http://localhost:5000/api/pets/${pet.pet_id}`, updatedPetData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            setMessage({ type: "success", text: "Pet updated successfully!" });

            // ✅ Refresh pets list
            fetchPets();

            // ✅ Close modal after 2 seconds
            setTimeout(() => setSelectedPet(null), 2000);
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to update pet." });
        }
    };

    return (
        <Dialog open={Boolean(pet)} onClose={() => setSelectedPet(null)}>
            <DialogTitle>Edit Pet</DialogTitle>
            <DialogContent>
                {message.text && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}

                {/* ✅ Profile Picture Preview */}
                <Avatar src={preview} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />

                <Input type="file" onChange={handleFileChange} sx={{ mb: 2 }} />

                <TextField label="Name" name="name" value={petData.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Breed" name="breed" value={petData.breed} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Age" name="age" type="number" value={petData.age} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Gender" name="gender" value={petData.gender} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Food" name="food" value={petData.food} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Temperament" name="temperament" value={petData.temperament} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

                <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2, mr: 1 }}>
                    Update Pet
                </Button>

                <Button variant="outlined" color="secondary" onClick={() => setSelectedPet(null)} sx={{ mt: 2 }}>
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default PetEdit;
