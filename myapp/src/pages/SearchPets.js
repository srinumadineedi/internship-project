import React, { useState } from "react";
import axios from "axios";
import {
  TextField, Button, Container, Grid, Card, CardContent, Typography, CardMedia, CircularProgress, Box
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const SearchPets = () => {
  const [filters, setFilters] = useState({ name: "", breed: "", age: "", gender: "" });
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Search API Call
  const searchPets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/search", { params: filters });
      setPets(response.data);
    } catch (error) {
      setError("Error fetching pets. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      
      {/* Back Button */}
      <Button 
        variant="text" 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate("/home")}
        sx={{ mb: 2, color: "#555" }}
      >
        Back to Home
      </Button>

      {/* Page Title */}
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        🐶 Search for Pets
      </Typography>

      {/* Search Filters */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Name" name="name" value={filters.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Breed" name="breed" value={filters.breed} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label="Age" name="age" value={filters.age} onChange={handleChange} type="number" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label="Gender" name="gender" value={filters.gender} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<SearchIcon />} 
            onClick={searchPets}
            sx={{ height: "100%", borderRadius: "10px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Loading Indicator */}
      {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

      {/* Error Message */}
      {error && <Typography color="error" align="center">{error}</Typography>}

      {/* Display Results */}
      <Grid container spacing={2} mt={3}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <Grid item xs={12} sm={4} key={pet.pet_id}>
              <Card sx={{ borderRadius: "15px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", transition: "0.3s", "&:hover": { boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.profile_pic ? `http://localhost:5000${pet.profile_pic}` : "/placeholder.jpg"}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{pet.name}</Typography>
                  <Typography variant="body2" color="textSecondary">Breed: {pet.breed}</Typography>
                  <Typography variant="body2" color="textSecondary">Age: {pet.age}</Typography>
                  <Typography variant="body2" color="textSecondary">Gender: {pet.gender}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          !loading && <Typography align="center" mt={3} color="textSecondary">No pets found. Try different filters.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SearchPets;
