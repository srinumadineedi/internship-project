import React, { useState } from "react";
import styled from "styled-components";
import { FaHeart, FaTrash } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #ff9966, #ff5e62); /* Unique Background */
  padding: 20px;
`;

const FavoritesBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const PetList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PetCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
  width: 90%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PetImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const PetInfo = styled.div`
  flex-grow: 1;
`;

const RemoveButton = styled.button`
  background: #ff4081;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;

  &:hover {
    background: #ff1a5e;
  }
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { name: "Charlie", breed: "Labrador", image: "https://source.unsplash.com/50x50/?dog" },
    { name: "Luna", breed: "Golden Retriever", image: "https://source.unsplash.com/50x50/?puppy" },
  ]);

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    console.log("Updated Favorites:", updatedFavorites);
  };

  return (
    <Container>
      <FavoritesBox>
        <Title>❤️ Your Favorite Pets</Title>

        <PetList>
          {favorites.length > 0 ? (
            favorites.map((pet, index) => (
              <PetCard key={index}>
                <PetImage src={pet.image} alt={pet.name} />
                <PetInfo>
                  <strong>{pet.name}</strong> - {pet.breed}
                </PetInfo>
                <RemoveButton onClick={() => removeFavorite(index)}>
                  <FaTrash />
                </RemoveButton>
              </PetCard>
            ))
          ) : (
            <p>No favorites yet! Start adding pets. 🐶</p>
          )}
        </PetList>
      </FavoritesBox>
    </Container>
  );
};

export default Favorites;
