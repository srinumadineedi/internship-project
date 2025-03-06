import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaEdit, FaTrash, FaMoon, FaSun, FaPlus, FaSave, FaTimes } from "react-icons/fa";

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

const FormContainer = styled.div`
  background: ${(props) => (props.darkMode ? "#2a2a3a" : "#fff")};
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.darkMode ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.1)"};
  width: 50%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
`;

const AdminPets = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pets, setPets] = useState([
    { id: 1, name: "Buddy", breed: "Golden Retriever", age: "3", owner: "John Doe" },
    { id: 2, name: "Luna", breed: "Poodle", age: "2", owner: "Alice Smith" },
    { id: 3, name: "Max", breed: "Bulldog", age: "4", owner: "Bob Johnson" },
  ]);

  const [editingPet, setEditingPet] = useState(null);
  const [newPet, setNewPet] = useState({ name: "", breed: "", age: "", owner: "" });

  const handleDelete = (id) => {
    const petToDelete = pets.find((pet) => pet.id === id);
    console.log("Pet Deleted:", petToDelete);
    setPets(pets.filter((pet) => pet.id !== id));
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
  };

  const handleSaveEdit = () => {
    setPets(
      pets.map((pet) =>
        pet.id === editingPet.id ? editingPet : pet
      )
    );
    console.log("Pet Updated:", editingPet);
    setEditingPet(null);
  };

  const handleAddPet = () => {
    const newPetData = {
      id: pets.length + 1,
      ...newPet,
    };
    setPets([...pets, newPetData]);
    console.log("New Pet Added:", newPetData);
    setNewPet({ name: "", breed: "", age: "", owner: "" });
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

        <FormContainer darkMode={darkMode}>
          <h3>{editingPet ? "Edit Pet" : "Add New Pet"}</h3>
          <Input
            type="text"
            placeholder="Pet Name"
            value={editingPet ? editingPet.name : newPet.name}
            onChange={(e) =>
              editingPet
                ? setEditingPet({ ...editingPet, name: e.target.value })
                : setNewPet({ ...newPet, name: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Breed"
            value={editingPet ? editingPet.breed : newPet.breed}
            onChange={(e) =>
              editingPet
                ? setEditingPet({ ...editingPet, breed: e.target.value })
                : setNewPet({ ...newPet, breed: e.target.value })
            }
          />
          <FormActions>
            {editingPet ? (
              <>
                <IconButton edit onClick={handleSaveEdit}>
                  <FaSave /> Save
                </IconButton>
                <IconButton onClick={() => setEditingPet(null)}>
                  <FaTimes /> Cancel
                </IconButton>
              </>
            ) : (
              <AddButton onClick={handleAddPet}>
                <FaPlus /> Add Pet
              </AddButton>
            )}
          </FormActions>
        </FormContainer>

        <Table>
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
      </Container>
    </>
  );
};

export default AdminPets;
