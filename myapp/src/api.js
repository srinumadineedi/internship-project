// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";  // Your home page
// import Messages from "./pages/Messages";  // Your new message page

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/messages" element={<Messages />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin"; // Adjust if needed

// Function to handle errors
const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        console.error("❌ API Error:", error.response?.data || error.message);
        throw error; // Re-throw to handle errors in the UI
    }
};

// ✅ Fetch all users
export const getUsers = async () => {
    return handleRequest(() => axios.get(`${API_BASE_URL}/users`, { headers: { "Content-Type": "application/json" } }));
};

// ✅ Update a user
export const updateUser = async (userId, updatedData) => {
    return handleRequest(() => axios.put(`${API_BASE_URL}/users/${userId}`, updatedData, { headers: { "Content-Type": "application/json" } }));
};

// ✅ Delete a user
export const deleteUser = async (userId) => {
    return handleRequest(() => axios.delete(`${API_BASE_URL}/users/${userId}`));
};

// ✅ Fetch system reports
export const getReports = async () => {
    return handleRequest(() => axios.get(`${API_BASE_URL}/reports`, { headers: { "Content-Type": "application/json" } }));
};
