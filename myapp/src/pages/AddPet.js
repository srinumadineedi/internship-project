import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaEdit, FaTrash, FaMoon, FaSun, FaPlus } from "react-icons/fa";
import {
  Typography,
  // Other MUI components
} from '@mui/material';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#1e1e2f" : "#f5f7fa")};
    color: ${(props) => (props.darkMode ? "#fff" : "#333")};
    transition: all 0.3s ease-in-out;
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: ${(props) => (props.darkMode ? "#ffd700" : "#333")};
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  background: ${(props) => (props.darkMode ? "#2a2a3a" : "#fff")};
  box-shadow: ${(props) =>
    props.darkMode ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.1)"};
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  background: ${(props) => (props.darkMode ? "#333" : "#ff6b81")};
  color: white;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: ${(props) => (props.darkMode ? "1px solid #444" : "1px solid #ddd")};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: ${(props) => (props.edit ? "#4CAF50" : "#E74C3C")};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const AddButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;

  &:hover {
    background: #2980b9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => (props.darkMode ? "#2a2a3a" : "#fff")};
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  max-width: 600px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => (props.darkMode ? "#444" : "#ddd")};
  border-radius: 5px;
  background: ${(props) => (props.darkMode ? "#333" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const AddPet = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pets, setPets] = useState([
    { id: 1, name: "Buddy", breed: "Golden Retriever", age: "3", owner: "John Doe" },
    { id: 2, name: "Luna", breed: "Poodle", age: "2", owner: "Alice Smith" },
    { id: 3, name: "Max", breed: "Bulldog", age: "4", owner: "Bob Johnson" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [newPet, setNewPet] = useState({ name: "", breed: "", age: "", owner: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (id) => {
    const petToDelete = pets.find((pet) => pet.id === id);
    console.log("Pet Deleted:", petToDelete);
    setPets(pets.filter((pet) => pet.id !== id));
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const handleAddPet = () => {
    console.log("New Pet Added:", newPet);
    // Implement logic to add new pet to the pets array or backend
    setPets([...pets, { id: pets.length + 1, ...newPet }]);
    setNewPet({ name: "", breed: "", age: "", owner: "" }); // Clear input
    closeModal();
  };

  const handleUpdatePet = () => {
    console.log("Pet Updated:", editingPet);
    // Implement logic to update pet in the pets array or backend
    setPets(pets.map((pet) => (pet.id === editingPet.id ? editingPet : pet)));
    setEditingPet(null);
    closeModal();
  };

  const renderModalContent = () => {
    if (editingPet) {
      // Edit Mode
      return (
        <>
          <Typography variant="h5">Edit Pet</Typography>
          <Input
            type="text"
            name="name"
            value={editingPet.name}
            onChange={(e) => setEditingPet({ ...editingPet, name: e.target.value })}
            placeholder="Name"
          />
          <Input
            type="text"
            name="breed"
            value={editingPet.breed}
            onChange={(e) => setEditingPet({ ...editingPet, breed: e.target.value })}
            placeholder="Breed"
          />
          <Input
            type="text"
            name="age"
            value={editingPet.age}
            onChange={(e) => setEditingPet({ ...editingPet, age: e.target.value })}
            placeholder="Age"
          />
          <Input
            type="text"
            name="owner"
            value={editingPet.owner}
            onChange={(e) => setEditingPet({ ...editingPet, owner: e.target.value })}
            placeholder="Owner"
          />
          <Button onClick={handleUpdatePet}>Update Pet</Button>
        </>
      );
    } else {
      // Add Mode
      return (
        <>
          <Typography variant="h5">Add New Pet</Typography>
          <Input
            type="text"
            name="name"
            value={newPet.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <Input
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={handleInputChange}
            placeholder="Breed"
          />
          <Input
            type="text"
            name="age"
            value={newPet.age}
            onChange={handleInputChange}
            placeholder="Age"
          />
          <Input
            type="text"
            name="owner"
            value={newPet.owner}
            onChange={handleInputChange}
            placeholder="Owner"
          />
          <Button onClick={handleAddPet}>Add Pet</Button>
        </>
      );
    }
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Container>
        <Header>
          <Title>Admin - Manage Pets</Title>
          <ToggleButton darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </ToggleButton>
        </Header>

        <AddButton onClick={() => {
          setEditingPet(null); // Ensure editingPet is null for add mode
          openModal();
        }}>
          <FaPlus /> Add New Pet
        </AddButton>

        <Table darkMode={darkMode}>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Breed</Th>
              <Th>Age</Th>
              <Th>Owner</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <Td>{pet.id}</Td>
                <Td>{pet.name}</Td>
                <Td>{pet.breed}</Td>
                <Td>{pet.age}</Td>
                <Td>{pet.owner}</Td>
                <Td>
                  <ActionButtons>
                    <IconButton edit onClick={() => handleEdit(pet)}>
                      <FaEdit /> Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete(pet.id)}>
                      <FaTrash /> Delete
                    </IconButton>
                  </ActionButtons>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent darkMode={darkMode} onClick={(e) => e.stopPropagation()}>
              {renderModalContent()}
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </>
  );
};

export default AddPet;