import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, Avatar, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PetDetails from "./PetDetails"; // ✅ Import PetDetails

const PetGallery = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null); // ✅ Store clicked pet

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/pets");
            setPets(response.data);
        } catch (error) {
            console.error("Error loading pets:", error);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            {/* ✅ Show Pet Details if a pet is selected */}
            {selectedPet ? (
                <PetDetails pet={selectedPet} setSelectedPet={setSelectedPet} />
            ) : (
                <>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Pet Gallery
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {pets.map((pet) => (
                            <Grid item xs={12} sm={6} md={4} key={pet.pet_id}>
                                <Card
                                    sx={{ textAlign: "center", p: 3, borderRadius: "20px", boxShadow: 3, cursor: "pointer" }}
                                    onClick={() => setSelectedPet(pet)} // ✅ Click to view pet details
                                >
                                    <Avatar
                                        src={`http://localhost:5000${pet.profile_pic}`}
                                        alt={pet.name}
                                        sx={{ width: 120, height: 120, mx: "auto", mb: 2, border: "3px solid #1976d2" }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{pet.name}</Typography>
                                        <Typography variant="body2"><strong>Breed:</strong> {pet.breed}</Typography>
                                        <Typography variant="body2"><strong>Age:</strong> {pet.age} years</Typography>
                                        <Typography variant="body2"><strong>Gender:</strong> {pet.gender}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* ✅ Back to Home Button */}
                    <Button variant="contained" color="primary" onClick={() => navigate("/home")} sx={{ mt: 3 }}>
                        Back to Home
                    </Button>
                </>
            )}
        </Container>
    );
};

export default PetGallery;
