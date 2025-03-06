// import React, { useState, useEffect } from "react";
// import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
// import api from "../api";

// const PetGallery = () => {
//     const [pets, setPets] = useState([]);

//     useEffect(() => {
//         fetchPets();
//     }, []);

//     const fetchPets = async () => {
//         try {
//             const response = await api.get("/pets");
//             setPets(response.data);
//         } catch (err) {
//             console.error("Error fetching pets:", err);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h4" sx={{ my: 3 }}>Pet Gallery</Typography>
//             <Grid container spacing={3}>
//                 {pets.map((pet) => (
//                     <Grid item xs={12} sm={6} md={4} key={pet.id}>
//                         <Card>
//                             <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
//                             <CardContent>
//                                 <Typography variant="h6">{pet.name}</Typography>
//                                 <Typography variant="body2">{pet.breed} - {pet.age} years old</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };

// export default PetGallery;
