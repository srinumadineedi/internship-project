const API_URL = "http://localhost:5000/api/messages";

// ✅ Fetch messages for a conversation
       // ✅ Fetch messages for a conversation
export const getMessages = async (conversation_id) => {
    if (!conversation_id) {
        console.error("❌ conversation_id is missing in API call!");
        return [];
    }

    try {
        const response = await fetch(`${API_URL}?conversationId=${conversation_id}`, { // Corrected URL
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        return [];
    }
};


// ✅ Send a new message
export const sendMessage = async (messageData) => {
    console.log("sendMessage called with messageData:", messageData); // ADD THIS

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageData),
        });

        console.log("sendMessage response:", response); // Add this line

        if (!response.ok) {
            console.error("sendMessage response status:", response.status); // Add this line
            console.error("sendMessage response text:", await response.text()); // Add this line
            throw new Error("Failed to send message");
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending message:", error);
        return null;
    }
};