import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";

const CompatibilityContainer = styled(Container)`
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

const CompatibilityCard = styled(Card)`
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const PetCompatibility = () => {
  const navigate = useNavigate();
  const [compatibilityData, setCompatibilityData] = useState([]);

  useEffect(() => {
    fetchCompatibilityDetails();
  }, []);

  const fetchCompatibilityDetails = async () => {
    console.log("Fetching pet compatibility details...");

    try {
      const response = await fetch("http://localhost:5000/api/pets/compatibility"); // Backend API
      const data = await response.json();
      console.log("Fetched Compatibility Data:", data);
      setCompatibilityData(data);
    } catch (error) {
      console.error("Error fetching compatibility details:", error);
    }
  };

  return (
    <CompatibilityContainer maxWidth="md">
      <BackButton onClick={() => navigate("/home")}>
        <ArrowBack />
      </BackButton>

      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Pet Compatibility Details
      </Typography>

      <Grid container spacing={2}>
        {compatibilityData.length > 0 ? (
          compatibilityData.map((pet) => (
            <Grid item xs={12} sm={6} key={pet.id}>
              <CompatibilityCard>
                <CardContent>
                  <Typography variant="h6">{pet.name} & {pet.compatibleWith}</Typography>
                  <Typography>Breed Match: {pet.breedCompatibility}%</Typography>
                  <LinearProgress variant="determinate" value={pet.breedCompatibility} />

                  <Typography sx={{ marginTop: 1 }}>Age Compatibility: {pet.ageCompatibility}%</Typography>
                  <LinearProgress variant="determinate" value={pet.ageCompatibility} />

                  <Typography sx={{ marginTop: 1 }}>Personality Match: {pet.personalityMatch}%</Typography>
                  <LinearProgress variant="determinate" value={pet.personalityMatch} />

                  <Typography sx={{ marginTop: 1 }}>Overall Compatibility: {pet.overallCompatibility}%</Typography>
                  <LinearProgress variant="determinate" value={pet.overallCompatibility} />
                </CardContent>
              </CompatibilityCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ marginTop: "2rem" }}>
            No compatibility details found.
          </Typography>
        )}
      </Grid>
    </CompatibilityContainer>
  );
};

export default PetCompatibility;
