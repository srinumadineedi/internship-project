import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";

const SearchContainer = styled(Container)`
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

const SearchButton = styled(Button)`
  margin-top: 1rem;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
`;

const ResultCard = styled(Card)`
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const petBreeds = ["Labrador", "German Shepherd", "Golden Retriever", "Poodle", "Bulldog"];
const healthStatuses = ["Excellent", "Good", "Average", "Needs Attention"];
const foodPreferences = ["Vegetarian", "Non-Vegetarian", "Mixed Diet"];

const AdvancedSearch = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    petName: "",
    breed: "",
    age: "",
    food: "",
    healthStatus: "",
  });

  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    console.log("Search Filters:", filters);

    // Simulated API Fetch - Replace with actual backend API call
    try {
      // Example fetch from backend (Replace later with real API)
      // const response = await fetch("http://localhost:5000/api/pets/search", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(filters),
      // });
      // const data = await response.json();
      
      // Mock search results (Replace with API response)
      const data = [
        { id: 1, petName: "Buddy", breed: "Labrador", age: "2 Years", food: "Non-Vegetarian", healthStatus: "Good" },
        { id: 2, petName: "Lucy", breed: "Golden Retriever", age: "3 Years", food: "Mixed Diet", healthStatus: "Excellent" },
      ];

      setResults(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleReset = () => {
    setFilters({ petName: "", breed: "", age: "", food: "", healthStatus: "" });
    setResults([]);
  };

  return (
    <SearchContainer maxWidth="md">
      <BackButton onClick={() => navigate("/home")}>
        <ArrowBack />
      </BackButton>

      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Advanced Search
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Pet Name"
            value={filters.petName}
            onChange={(e) => setFilters({ ...filters, petName: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Breed"
            value={filters.breed}
            onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
          >
            {petBreeds.map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Food Preference"
            value={filters.food}
            onChange={(e) => setFilters({ ...filters, food: e.target.value })}
          >
            {foodPreferences.map((food) => (
              <MenuItem key={food} value={food}>
                {food}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Health Status"
            value={filters.healthStatus}
            onChange={(e) => setFilters({ ...filters, healthStatus: e.target.value })}
          >
            {healthStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <SearchButton variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Apply Filters
          </SearchButton>
        </Grid>

        <Grid item xs={12} sm={6}>
          <SearchButton variant="outlined" color="secondary" fullWidth onClick={handleReset}>
            Reset Filters
          </SearchButton>
        </Grid>
      </Grid>

      {/* Display Search Results */}
      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {results.map((pet) => (
              <Grid item xs={12} sm={6} key={pet.id}>
                <ResultCard>
                  <CardContent>
                    <Typography variant="h6">{pet.petName}</Typography>
                    <Typography>Breed: {pet.breed}</Typography>
                    <Typography>Age: {pet.age}</Typography>
                    <Typography>Food: {pet.food}</Typography>
                    <Typography>Health: {pet.healthStatus}</Typography>
                  </CardContent>
                </ResultCard>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </SearchContainer>
  );
};

export default AdvancedSearch;
