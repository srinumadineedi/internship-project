import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Button, // Import Button component
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Import Link for navigation (requires React Router)

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

const StyledParagraph = styled(Typography)(({ theme }) => ({
  textAlign: "justify",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const AboutUs = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO",
      imageUrl: "https://mui.com/static/images/avatar/1.jpg",
      bio: "John has a passion for innovation.",
    },
    {
      name: "Jane Smith",
      position: "CTO",
      imageUrl: "https://mui.com/static/images/avatar/2.jpg",
      bio: "Jane is an expert in technology and drives our vision.",
    },
  ];

  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h4">About Us</StyledTitle>

      <StyledParagraph variant="body1">
        Welcome! We provide top-notch services with quality and reliability in mind.
        We constantly improve and exceed expectations. Our team is dedicated to results.
      </StyledParagraph>

      <StyledParagraph variant="body1">
        Our mission: innovate and simplify. We use the latest tech and are committed to sustainability.
      </StyledParagraph>

      {/* Project Information Section */}
      <Typography variant="h6" fontWeight="bold" className="mt-6 mb-3">
        Our Project
      </Typography>
      <StyledParagraph variant="body1">
        This project aims to solve [Specific problem the project addresses] by providing a user-friendly platform for [Describe the core functionality].
        We leverage [Technologies used] to deliver a seamless and efficient experience. We are passionate about making a positive impact on [Target audience].
      </StyledParagraph>
      <StyledParagraph variant="body1">
        We envision this project becoming [Describe future vision and goals].  We are continuously working on new features and improvements based on user feedback.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-6 mb-3">
        Our Team
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledAvatar alt={member.name} src={member.imageUrl} />
            <Typography variant="h6" fontWeight="bold">
              {member.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {member.position}
            </Typography>
            <StyledParagraph variant="body2" textAlign="center">
              {member.bio}
            </StyledParagraph>
          </Grid>
        ))}
      </Grid>

      {/* Back to Home Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link} // Use Link component for navigation
          to="/home" // Specify the path to the home page
        >
          Back to Home
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default AboutUs;