import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { FaSun, FaMoon, FaPaw, FaSearch, FaHeart, FaUsers } from "react-icons/fa"; // Basic FA Icons
import {
  MdList,
  MdImage,
  MdComment,
  MdCheckCircle,
  MdBarChart,
  MdHistory,
  MdSettings,
  MdEmail,
  MdLock,
  MdDescription,
} from "react-icons/md"; // Material Design Icons
import heroImage from "../assets/dog5.jpg"; // Your hero image
import { Grid, Card, CardContent, Typography, Button, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showMoreSection1, setShowMoreSection1] = useState(false);
  const [showMoreSection2, setShowMoreSection2] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Example breakpoint

  // Toggle Dark Mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Function to set initial theme on component mount
  useEffect(() => {
    const isDarkModePreferred = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkModePreferred) {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const ServiceCard = ({ name, link, icon, section }) => {
    return (
      <Card
        onClick={() => navigate(link)}
        sx={{
          height: "100%", // Ensure all cards are the same height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: theme.palette.action.hover, // Themed hover color
          },
        }}
        section={section}
        darkMode={darkMode}
      >
        <CardContent>
          <Box mb={2} fontSize={30}>
            {icon}
          </Box>{" "}
          {/* Icon spacing */}
          <Typography variant="h6">{name}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">Marriage Bureau for Pets</div>

        {/* Navbar Items */}
        <div className="navbar-items">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/notifications" className="nav-link">
                Notifications
              </a>
            </li>
            <li className="nav-item">
              <a href="/messages" className="nav-link">
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/match-history" className="nav-link">
                Search & Matches
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate("/userprofile")} className="nav-link">
                User Profile
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate("/register-pet")} className="nav-link">
                PetRegistration
              </a>
            </li>
            <li className="nav-item">
              <a href="/settings" className="nav-link">
                Settings
              </a>
            </li>
          </ul>

          {/* Dark Mode Icon */}
          <span className="theme-icon" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage} alt="Happy Pet" className="hero-image" />
        <div className="hero-overlay">
          <Typography variant="h2" fontWeight="bold" color="white" textAlign="left">
            Every Pet Deserves <br />
            <span className="highlight-text">Love and Care</span>
          </Typography>
        </div>
      </div>

      {/* SECTION 1: Important Services */}
      <section className="services-section">
        {/* Use a color specific to section 1 for section back ground  */}
        <div className="section-header">
          <Typography variant="h5">Important Services</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowMoreSection1(!showMoreSection1)}>
            {showMoreSection1 ? "View Less" : "View All"}
          </Button>
        </div>
        <Grid container spacing={2} height={isSmallScreen ? "auto" : 300}>
          {/* Fixed Height for Section 1 */}
          {[
            { name: "Dashboard", link: "/dashboard", icon: <FaPaw /> },
            { name: "Advanced Search", link: "/advanced-search", icon: <FaSearch /> },
            { name: "Search Results", link: "/search-results", icon: <MdList /> },
            { name: "Matchmaking Recommendations", link: "/matchmaking-recommendations", icon: <FaHeart /> },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard name={item.name} link={item.link} icon={item.icon} section={1} />
            </Grid>
          ))}
        </Grid>

        {/* Extra Services (Shown on View All) */}
        {showMoreSection1 && (
          <Grid container spacing={2} height={isSmallScreen ? "auto" : 300}>
            {/* Fixed Height for Section 1 */}
            {[
              { name: "Pet Gallery", link: "/pet-gallery", icon: <MdImage /> },
              { name: "Pet Matches", link: "/pet-matches", icon: <FaHeart /> },
              { name: "Feedback", link: "/feedback", icon: <MdComment /> },
              { name: "Pet Compatibility", link: "/pet-compatibility", icon: <MdCheckCircle /> },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ServiceCard name={item.name} link={item.link} icon={item.icon} section={1} />
              </Grid>
            ))}
          </Grid>
        )}
      </section>

      {/* SECTION 2: Admin Services */}
      <section className="services-section">
        <div className="section-header">
          <Typography variant="h5">Admin Services</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowMoreSection2(!showMoreSection2)}>
            {showMoreSection2 ? "View Less" : "View All"}
          </Button>
        </div>
        <Grid container spacing={2} height={isSmallScreen ? "auto" : 300}>
          {/* Fixed Height for Section 2 */}
          {[
            { name: "Admin Dashboard", link: "/admin-dashboard", icon: <MdBarChart /> },
            { name: "User Management", link: "/user-management", icon: <FaUsers /> },
            { name: "Pet Management", link: "/pet-management", icon: <FaPaw /> },
            { name: "Match History", link: "/match-history", icon: <MdHistory /> },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard name={item.name} link={item.link} icon={item.icon} section={2} />
            </Grid>
          ))}
        </Grid>

        {/* Extra Admin Services (Shown on View All) */}
        {showMoreSection2 && (
          <Grid container spacing={2} height={isSmallScreen ? "auto" : 300}>
            {/* Fixed Height for Section 2 */}
            {[
              { name: "Profile Settings", link: "/profile-settings", icon: <MdSettings /> },
              { name: "Message Settings", link: "/message-settings", icon: <MdEmail /> },
              { name: "Privacy Policy", link: "/privacy-policy", icon: <MdLock /> },
              { name: "Terms & Conditions", link: "/terms-conditions", icon: <MdDescription /> },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ServiceCard name={item.name} link={item.link} icon={item.icon} section={2} />
              </Grid>
            ))}
          </Grid>
        )}
      </section>

      <footer className="footer">
        <div className="footer-columns">
          {/* About Section */}
          <div className="footer-column">
            <h3>Marriage Bureau for Pets</h3>
            <p>Find the perfect match for your furry friends.</p>
          </div>

          {/* Discover Section */}
          <div className="footer-column">
            <h3>Discover</h3>
            <ul>
              <li>
                <a href="/search-results">Search Results</a>
              </li>
              <li>
                <a href="/matchmaking-recommendations">Matchmaking</a>
              </li>
              <li>
                <a href="/pet-gallery">Pet Gallery</a>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="footer-column">
            <h3>Community</h3>
            <ul>
              <li>
                <a href="/blog">BlogNews</a>
              </li>
              <li>
                <a href="/forum">Forum</a>
              </li>
              <li>
                <a href="/creators">Creators</a>
              </li>
              <li>
                <a href="/feedback">Feedback</a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="footer-column">
            <h3>About</h3>
            <ul>
              <li>
                <a href="/about-us">AboutUs</a>
              </li>
              <li>
                <a href="/privacypolicy">PrivacyPolicy</a>
              </li>
              <li>
                <a href="/terms-conditions">TermsConditions</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            📷
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            📌
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            🐦
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            📘
          </a>
        </div>

        {/* Copyright */}
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          © 2025 Marriage Bureau for Pets. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;