import React from "react";
import { Container, Typography, Card, CardContent, Avatar, Button } from "@mui/material";

const PetDetails = ({ pet, setSelectedPet }) => {
    return (
        <Container sx={{ mt: 4 }}>
            <Card sx={{ p: 4, textAlign: "center", borderRadius: "20px", boxShadow: 3, maxWidth: 500, mx: "auto" }}>
                <Avatar
                    src={`http://localhost:5000${pet.profile_pic}`}
                    alt={pet.name}
                    sx={{ width: 150, height: 150, mx: "auto", mb: 2, border: "4px solid #1976d2" }}
                />
                <CardContent>
                    <Typography variant="h4">{pet.name}</Typography>
                    <Typography variant="body1"><strong>Breed:</strong> {pet.breed}</Typography>
                    <Typography variant="body1"><strong>Age:</strong> {pet.age} years</Typography>
                    <Typography variant="body1"><strong>Gender:</strong> {pet.gender}</Typography>
                    <Typography variant="body1"><strong>Temperament:</strong> {pet.temperament}</Typography>
                    <Typography variant="body1"><strong>Food:</strong> {pet.food}</Typography>
                    <Typography variant="body1"><strong>Health Status:</strong> {pet.health_status}</Typography>
                </CardContent>

                {/* ✅ Back to Gallery Button */}
                <Button variant="contained" color="primary" onClick={() => setSelectedPet(null)} sx={{ mt: 2 }}>
                    Back to Gallery
                </Button>

                {/* ✅ Back to Home Button */}
                <Button variant="outlined" color="secondary" onClick={() => window.location.href = "/home"} sx={{ mt: 2, ml: 2 }}>
                    Back to Home
                </Button>
            </Card>
        </Container>
    );
};

export default PetDetails;
