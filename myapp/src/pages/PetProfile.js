import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPaw, FaDog, FaCalendarAlt, FaHeartbeat, FaUtensils, FaArrowLeft, FaEdit } from "react-icons/fa";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  padding: 12px;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
`;

const Icon = styled.div`
  color: #007bff;
  font-size: 1.2rem;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: none;
  font-size: 1rem;
  outline: none;
  color: #333;

  &::placeholder {
    color: #888;
  }
`;

const SaveButton = styled.button`
  background: ${(props) => (props.isEditing ? "#ffc107" : "#28a745")};
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;

  &:hover {
    background: ${(props) => (props.isEditing ? "#e0a800" : "#218838")};
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const ErrorText = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const PetProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [petData, setPetData] = useState({
    petName: "",
    breed: "",
    age: "",
    healthStatus: "",
    food: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchPetData(storedUserId);
    }
  }, []);

  const fetchPetData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
      if (response.data) {
        setPetData(response.data);
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  const handleChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!petData.petName || !petData.breed || !petData.age || !petData.healthStatus || !petData.food) {
      setError("⚠️ All fields are required!");
      return;
    }
    setError("");

    try {
      if (isRegistered) {
        await axios.put(`http://localhost:5000/api/pets/${userId}`, petData);
        alert("Pet details updated successfully!");
      } else {
        await axios.post(`http://localhost:5000/api/pets`, { userId, ...petData });
        alert("Pet registered successfully!");
        setIsRegistered(true);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving pet data:", error);
      setError("Failed to save pet details.");
    }
  };

  return (
    <Container>
      <ProfileCard>
        <BackButton onClick={() => navigate("/home")}>
          <FaArrowLeft />
        </BackButton>

        {isRegistered && !isEditing && (
          <EditButton onClick={() => setIsEditing(true)}>
            <FaEdit />
          </EditButton>
        )}

        {/* Pet Name Input */}
        <InputContainer>
          <Icon>
            <FaPaw />
          </Icon>
          <Input
            type="text"
            name="petName"
            placeholder="Pet Name"
            value={petData.petName}
            onChange={handleChange}
            disabled={!isEditing && isRegistered}
          />
        </InputContainer>

        {/* Breed Input */}
        <InputContainer>
          <Icon>
            <FaDog />
          </Icon>
          <Input
            type="text"
            name="breed"
            placeholder="Breed"
            value={petData.breed}
            onChange={handleChange}
            disabled={!isEditing && isRegistered}
          />
        </InputContainer>

        {/* Age Input */}
        <InputContainer>
          <Icon>
            <FaCalendarAlt />
          </Icon>
          <Input
            type="number"
            name="age"
            placeholder="Age"
            value={petData.age}
            onChange={handleChange}
            disabled={!isEditing && isRegistered}
          />
        </InputContainer>

        {/* Health Status Input */}
        <InputContainer>
          <Icon>
            <FaHeartbeat />
          </Icon>
          <Input
            type="text"
            name="healthStatus"
            placeholder="Health Status"
            value={petData.healthStatus}
            onChange={handleChange}
            disabled={!isEditing && isRegistered}
          />
        </InputContainer>

        {/* Food Input */}
        <InputContainer>
          <Icon>
            <FaUtensils />
          </Icon>
          <Input
            type="text"
            name="food"
            placeholder="Food"
            value={petData.food}
            onChange={handleChange}
            disabled={!isEditing && isRegistered}
          />
        </InputContainer>

        {error && <ErrorText>{error}</ErrorText>}

        <SaveButton onClick={handleSave} isEditing={isEditing}>
          {isRegistered ? "Update Pet Details" : "Register Pet"}
        </SaveButton>
      </ProfileCard>
    </Container>
  );
};

export default PetProfile;
