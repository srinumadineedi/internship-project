import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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

const StyledParagraph = styled(Typography)(({ theme }) => ({
  textAlign: "justify",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const PrivacyPolicy = () => {
  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h4">Privacy Policy</StyledTitle>

      <StyledParagraph variant="body1">
        Your privacy is critically important to us. At [Your Company Name], we are committed to protecting your personal information and ensuring its confidentiality. This privacy policy outlines how we collect, use, and safeguard your data.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        Information We Collect
      </Typography>
      <StyledParagraph variant="body1">
        We collect only the information necessary to provide and improve our services. This may include:
        <ul>
          <li>Email address (if you subscribe to our newsletter)</li>
          <li>Usage data (e.g., pages visited, time spent on site)</li>
          <li>Device information (e.g., browser type, operating system)</li>
        </ul>
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        How We Use Your Information
      </Typography>
      <StyledParagraph variant="body1">
        We use the collected information for the following purposes:
        <ul>
          <li>To personalize your experience</li>
          <li>To improve our website and services</li>
          <li>To send you newsletters and updates (if you subscribe)</li>
          <li>To respond to your inquiries</li>
          <li>To prevent fraud and ensure security</li>
        </ul>
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        Data Security
      </Typography>
      <StyledParagraph variant="body1">
        We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. These measures include encryption, firewalls, and regular security audits.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        Third-Party Disclosure
      </Typography>
      <StyledParagraph variant="body1">
        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law. We may share information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        Cookies
      </Typography>
      <StyledParagraph variant="body1">
        We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but this may affect the functionality of our website.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        Changes to This Privacy Policy
      </Typography>
      <StyledParagraph variant="body1">
        We reserve the right to update this privacy policy at any time. We will notify you of any changes by posting the new policy on our website.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        Contact Us
      </Typography>
      <StyledParagraph variant="body1">
        If you have any questions about this privacy policy, please contact us at [Your Contact Email Address].
      </StyledParagraph>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/home"
        >
          Back to Home
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default PrivacyPolicy;