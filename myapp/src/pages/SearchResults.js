import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";

const ResultContainer = styled(Container)`
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

const SearchResults = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    breed: "",
    health: "",
  });

  const [pets, setPets] = useState([]); // State to store pets from DB
  const [searchClicked, setSearchClicked] = useState(false); // Controls search results visibility

  const handleSearch = async () => {
    setSearchClicked(true); // Show results only after search is clicked
    console.log("Search Filters:", filters); // Print filters to console (For backend)

    try {
      const response = await fetch("http://localhost:5000/api/pets/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      const data = await response.json();
      console.log("Fetched Pets Data:", data); // Print fetched data to console
      setPets(data); // Store pets in state
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleReset = () => {
    setFilters({ breed: "", health: "" });
    setPets([]);
    setSearchClicked(false);
  };

  return (
    <ResultContainer maxWidth="md">
      {/* Back Button to Homepage */}
      <BackButton onClick={() => navigate("/home")}>
        <ArrowBack />
      </BackButton>

      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Search Results
      </Typography>

      {/* Filter & Search Controls */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Breed</InputLabel>
            <Select
              name="breed"
              value={filters.breed}
              onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {petBreeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Health</InputLabel>
            <Select
              name="health"
              value={filters.health}
              onChange={(e) => setFilters({ ...filters, health: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {healthStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <SearchButton variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </SearchButton>
        </Grid>

        <Grid item xs={12} sm={6}>
          <SearchButton variant="outlined" color="secondary" fullWidth onClick={handleReset}>
            Reset
          </SearchButton>
        </Grid>
      </Grid>

      {/* Display Search Results (Only after clicking Search) */}
      {searchClicked && (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginTop: "2rem" }}>
            Pet Matches
          </Typography>
          <Grid container spacing={2}>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <Grid item xs={12} sm={6} key={pet.id}>
                  <ResultCard>
                    <CardContent>
                      <Typography variant="h6">{pet.name}</Typography>
                      <Typography>Breed: {pet.breed}</Typography>
                      <Typography>Age: {pet.age} Years</Typography>
                      <Typography>Food: {pet.food}</Typography>
                      <Typography>Health: {pet.health}</Typography>
                    </CardContent>
                  </ResultCard>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" textAlign="center" sx={{ marginTop: "2rem" }}>
                No pets found matching your criteria.
              </Typography>
            )}
          </Grid>
        </>
      )}
    </ResultContainer>
  );
};

export default SearchResults;
