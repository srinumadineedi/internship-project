import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaCamera, FaUser, FaEnvelope, FaLock, FaArrowLeft, FaEdit } from "react-icons/fa";
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

const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
  margin-bottom: 10px;
`;

const UploadInput = styled.input`
  display: none;
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
  background: #28a745;
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
    background: #218838;
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

const ProfileOptions = styled.div`
  background: white;
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const OptionButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;

const UserProfile = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [tempProfilePic, setTempProfilePic] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });

  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null); // Assuming you have access to user ID
  useEffect(() => {
    // Fetch user data and populate the form
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`); // Replace with your API endpoint
        setUserData(response.data);
        setProfilePic(response.data.profilePic); // Assuming your API returns profilePic
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      }
    };

    // Retrieve userId from local storage or session storage
    const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (storedUserId) {
        setUserId(storedUserId);
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfilePic(imageUrl);
      setShowOptions(true);
    }
  };

  const confirmProfileChange = () => {
    setProfilePic(tempProfilePic);
    setShowOptions(false);
  };

  const cancelProfileChange = () => {
    setTempProfilePic(null);
    setShowOptions(false);
  };

  const handleSave = async () => {
    if (!userData.fullName || !userData.email || !userData.password || !userData.bio) {
      setError("⚠️ All fields are required!");
      return;
    }
    setError("");

    try {
      // Send updated data to the backend
      await axios.put(`http://localhost:5000/api/user/${userId}`, userData); // Replace with your API endpoint
      alert("User profile saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update profile.");
    }
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      <ProfileCard>
        {/* Back Button (Navigates to Home.js) */}
        <BackButton onClick={() => navigate("/home")}>
          <FaArrowLeft />
        </BackButton>
        {/* Conditional Rendering of Edit Button */}
        {!isEditing && (
          <EditButton onClick={toggleEdit}>
            <FaEdit />
          </EditButton>
        )}
        {/* Profile Picture */}
        <ProfileImageWrapper onClick={() => document.getElementById("profilePicInput").click()}>
          <ProfileImage
            src={profilePic || "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png"}
            alt="User"
          />
        </ProfileImageWrapper>

        <UploadInput
          id="profilePicInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {showOptions && (
          <ProfileOptions>
            <OptionButton onClick={confirmProfileChange}>Change Profile</OptionButton>
            <OptionButton onClick={cancelProfileChange}>Cancel</OptionButton>
          </ProfileOptions>
        )}

        {/* Full Name Input */}
        <InputContainer>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={handleChange}
            disabled={!isEditing} // Disable input when not editing
          />
        </InputContainer>

        {/* Email Input */}
        <InputContainer>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </InputContainer>

        {/* Password Input */}
        <InputContainer>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </InputContainer>

        {/* Bio Input */}
        <InputContainer>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            name="bio"
            placeholder="Bio / About"
            value={userData.bio}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </InputContainer>

        {error && <ErrorText>{error}</ErrorText>}

        {isEditing ? (
          <SaveButton onClick={handleSave}>Save Profile</SaveButton>
        ) : null}
      </ProfileCard>
    </Container>
  );
};

export default UserProfile;