import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Card, CardContent, CardMedia, Grid, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetEdit from "./PetEdit"; // ✅ Import PetEdit (Fix)

const PetManagement = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null); // ✅ Store pet being edited
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage({ type: "error", text: "Authentication error. Please log in again." });
                return;
            }

            const response = await axios.get("http://localhost:5000/api/pets", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPets(response.data);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load pets." });
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage({ type: "error", text: "Authentication error. Please log in again." });
                return;
            }

            await axios.delete(`http://localhost:5000/api/pets/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage({ type: "success", text: "Pet deleted successfully!" });
            fetchPets(); // Refresh list
        } catch (error) {
            setMessage({ type: "error", text: "Failed to delete pet." });
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Manage Your Pets
            </Typography>

            {message.text && <Alert severity={message.type}>{message.text}</Alert>}

            <Grid container spacing={3}>
                {pets.map((pet) => (
                    <Grid item xs={12} sm={6} md={4} key={pet.pet_id}>
                        <Card>
                            <CardMedia component="img" height="200" image={`http://localhost:5000${pet.profile_pic}`} alt={pet.name} />
                            <CardContent>
                                <Typography variant="h6">{pet.name}</Typography>
                                <Typography variant="body2">Breed: {pet.breed}</Typography>
                                <Typography variant="body2">Age: {pet.age}</Typography>
                                <Typography variant="body2">Gender: {pet.gender}</Typography>
                                <Typography variant="body2">Food: {pet.food}</Typography>

                                {/* ✅ Open Edit Dialog */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2, mr: 1 }}
                                    onClick={() => setSelectedPet(pet)} // ✅ Set pet for editing
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ mt: 2 }}
                                    onClick={() => handleDelete(pet.pet_id)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* ✅ Back to Home Button */}
            <Button variant="outlined" color="secondary" onClick={() => navigate("/home")} sx={{ mt: 3 }}>
                Back to Home
            </Button>

            {/* ✅ Pet Edit Dialog (Only Show When Editing) */}
            {selectedPet && <PetEdit pet={selectedPet} fetchPets={fetchPets} setSelectedPet={setSelectedPet} />}
        </Container>
    );
};

export default PetManagement;
