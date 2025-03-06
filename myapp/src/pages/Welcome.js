import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styled Components
const WelcomeContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const CarouselWrapper = styled(Box)`
  .slick-slide img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 60px; /* Increased spacing for clear separation */
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  line-height: 1.8; /* Increases line spacing for readability */
`;

const StyledButton = styled(Button)`
  margin-top: 70px;  /* Extra spacing after text */
  padding: 20px 50px;
  font-size: 1.6rem;
  font-weight: bold;
  border-radius: 50px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  color: white;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  box-shadow: 0px 5px 20px rgba(255, 65, 108, 0.5);
  border: none;

   &:hover {
    background: #ffffff;
    color: #000000;
    border: 2px solid black;
    transform: scale(1.05);
  }
`;




const Welcome = () => {
  const navigate = useNavigate();

  // Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <WelcomeContainer>
      {/* Image Carousel */}
      <CarouselWrapper>
        <Slider {...settings}>
          <div>
            <img src="https://cdn.pixabay.com/photo/2022/02/06/14/06/dog-6997211_1280.jpg" alt="Pet 1" />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2020/09/27/04/15/cat-5605615_1280.jpg" alt="Pet 2" />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2023/06/05/13/56/cat-8042342_1280.jpg" alt="Pet 3" />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2023/12/04/17/24/evening-8429871_1280.jpg" alt="Pet 4" />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2024/05/09/17/24/shih-tzu-8751508_1280.jpg" alt="Pet 5" />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2018/03/29/21/51/cute-3273789_1280.jpg" alt="Pet 6" />
          </div>
        </Slider>
      </CarouselWrapper>

      {/* Dark Overlay with Text & Button */}
      <Overlay>
        <Typography variant="h3" fontWeight="bold">
          Quality Things for Loving Pets
        </Typography>
        <Typography variant="h6" mt={2}>
          Keeping Your Pet Smiling 😊
        </Typography>

        <StyledButton onClick={() => navigate("/register")}>Get Started</StyledButton>
      </Overlay>
    </WelcomeContainer>
  );
};

export default Welcome;
