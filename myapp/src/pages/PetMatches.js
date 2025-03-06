import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, Avatar, Alert, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PetMatches = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage({ type: "error", text: "Authentication error. Please log in again." });
                return;
            }

            const response = await axios.get("http://localhost:5000/api/pets/matches", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMatches(response.data);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load matches." });
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Pet Matchmaking
            </Typography>

            {message.text && <Alert severity={message.type}>{message.text}</Alert>}

            <Grid container spacing={3} justifyContent="center">
                {matches.map((petMatch, index) => (
                    <Grid item xs={12} key={index}>
                        <Card sx={{ p: 3, borderRadius: "20px", boxShadow: 3 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
                                Matches for <strong>{petMatch.pet}</strong>
                            </Typography>

                            {petMatch.matches.length === 0 ? (
                                <Typography textAlign="center" color="error">
                                    No matches found for {petMatch.pet} 😢
                                </Typography>
                            ) : (
                                <Grid container spacing={3} justifyContent="center">
                                    {petMatch.matches.map((match) => (
                                        <Grid item xs={12} sm={6} md={4} key={match.pet_id}>
                                            <Card sx={{ textAlign: "center", p: 2, borderRadius: "15px", boxShadow: 2 }}>
                                                <Avatar
                                                    src={`http://localhost:5000${match.profile_pic}`}
                                                    alt={match.name}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        mx: "auto",
                                                        mb: 2,
                                                        border: "3px solid #1976d2",
                                                    }}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6">{match.name}</Typography>
                                                    <Typography variant="body2"><strong>Breed:</strong> {match.breed}</Typography>
                                                    <Typography variant="body2"><strong>Age:</strong> {match.age} years</Typography>
                                                    <Typography variant="body2"><strong>Gender:</strong> {match.gender}</Typography>
                                                    <Typography variant="body2"><strong>Temperament:</strong> {match.temperament}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* ✅ Back to Home Button */}
            <Button variant="contained" color="primary" onClick={() => navigate("/home")} sx={{ mt: 3 }}>
                Back to Home
            </Button>
        </Container>
    );
};

export default PetMatches;
