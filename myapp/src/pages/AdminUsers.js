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

const AdminUsers = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 2, name: "Alice Smith", email: "alice@example.com", role: "Admin" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    console.log("User Deleted:", userToDelete);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? editingUser : user
      )
    );
    console.log("User Updated:", editingUser);
    setEditingUser(null);
  };

  const handleAddUser = () => {
    const newUserData = {
      id: users.length + 1,
      ...newUser,
    };
    setUsers([...users, newUserData]);
    console.log("New User Added:", newUserData);
    setNewUser({ name: "", email: "", role: "User" });
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Container>
        <Header>
          <Title>Admin - Manage Users</Title>
          <ToggleButton darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </ToggleButton>
        </Header>

        <FormContainer darkMode={darkMode}>
          <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
          <Input
            type="text"
            placeholder="Full Name"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <FormActions>
            {editingUser ? (
              <>
                <IconButton edit onClick={handleSaveEdit}>
                  <FaSave /> Save
                </IconButton>
                <IconButton onClick={() => setEditingUser(null)}>
                  <FaTimes /> Cancel
                </IconButton>
              </>
            ) : (
              <AddButton onClick={handleAddUser}>
                <FaPlus /> Add User
              </AddButton>
            )}
          </FormActions>
        </FormContainer>

        <Table>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <ActionButtons>
                    <IconButton edit onClick={() => handleEdit(user)}>
                      <FaEdit /> Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}>
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

export default AdminUsers;
