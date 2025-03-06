import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";

const MatchContainer = styled(Container)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  position: relative;
`;

const BackButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #4a90e2;
  color: white;
  &:hover {
    background: #357abd;
  }
`;

const MatchCard = styled(Card)`
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ActionButton = styled(Button)`
  margin-top: 1rem;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 5px;
`;

const MatchmakingRecommendations = () => {
  const navigate = useNavigate();
  const [recommendedPets, setRecommendedPets] = useState([]);

  useEffect(() => {
    fetchRecommendedPets();
  }, []);

  const fetchRecommendedPets = async () => {
    console.log("Fetching recommended pets...");

    try {
      const response = await fetch("http://localhost:5000/api/pets/recommendations"); // Backend API
      const data = await response.json();
      console.log("Fetched Recommended Pets:", data);
      setRecommendedPets(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <MatchContainer maxWidth="md">
      <BackButton onClick={() => navigate("/home")}>
        <ArrowBack />
      </BackButton>

      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Matchmaking Recommendations
      </Typography>

      <Grid container spacing={2}>
        {recommendedPets.length > 0 ? (
          recommendedPets.map((pet) => (
            <Grid item xs={12} sm={6} key={pet.id}>
              <MatchCard>
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography>Breed: {pet.breed}</Typography>
                  <Typography>Age: {pet.age} Years</Typography>
                  <Typography>Food: {pet.food}</Typography>
                  <Typography>Health: {pet.health}</Typography>
                  <ActionButton variant="contained" color="primary">
                    View Profile
                  </ActionButton>
                </CardContent>
              </MatchCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ marginTop: "2rem" }}>
            No matches found. Please check again later.
          </Typography>
        )}
      </Grid>
    </MatchContainer>
  );
};

export default MatchmakingRecommendations;
