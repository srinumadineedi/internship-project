import axios from "axios";

const API_URL = "http://localhost:5000/api/conversations";

// ✅ Get a user's conversations
export const getConversations = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}?user_id=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
};
