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
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  textAlign: "center", // Center the title
}));

const StyledParagraph = styled(Typography)(({ theme }) => ({
  textAlign: "justify",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const TermsConditions = () => {
  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h4">Terms and Conditions</StyledTitle>

      <StyledParagraph variant="body1">
        Welcome to [Your Company Name]! These terms and conditions outline the rules and regulations for the use of our website and services.
        By accessing this website and using our services, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website or our services.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        1. Intellectual Property
      </Typography>
      <StyledParagraph variant="body1">
        Unless otherwise stated, [Your Company Name] and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        2. Acceptable Use
      </Typography>
      <StyledParagraph variant="body1">
        You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity. You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        3. Limitations of Liability
      </Typography>
      <StyledParagraph variant="body1">
        The information on this website is provided "as is" without any representations or warranties, express or implied. [Your Company Name] makes no representations or warranties in relation to the information on this website.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        4. Revisions to these Terms and Conditions
      </Typography>
      <StyledParagraph variant="body1">
        We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of our website from the date of the publication of the revised terms and conditions on our website. Please check this page regularly to ensure you are familiar with the current version.
      </StyledParagraph>

      <Typography variant="h6" fontWeight="bold" className="mt-4 mb-2">
        5. Law and Jurisdiction
      </Typography>
      <StyledParagraph variant="body1">
        These terms and conditions will be governed by and construed in accordance with [Your Country/State Law], and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of [Your Country/State].
      </StyledParagraph>

      <Box mt={4} textAlign="center"> {/* Center the button */}
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

export default TermsConditions;