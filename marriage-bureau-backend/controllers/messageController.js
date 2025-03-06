import Message from "../models/messageModel.js";

const messageController = {
    getMessages: async (req, res) => {
        try {
            const { conversationId } = req.query; // Get conversationId from query parameters

            if (!conversationId) {
                return res.status(400).json({ message: "Conversation ID is required." });
            }

            const messages = await Message.getMessagesByConversationId(conversationId);
            res.status(200).json(messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ message: "Failed to fetch messages." });
        }
    },

    createMessage: async (req, res) => {
        try {
            const { sender_id, receiver_id, content, conversation_id, image_url } = req.body;

            if (!sender_id || !receiver_id || !content || !conversation_id) {
                return res.status(400).json({ message: "Sender ID, Receiver ID, Content, and Conversation ID are required." });
            }

            const newMessage = await Message.createMessage(sender_id, receiver_id, content, conversation_id, image_url);
            res.status(201).json(newMessage);
        } catch (error) {
            console.error("Error creating message:", error);
            res.status(500).json({ message: "Failed to create message." });
        }
    },
};

export default messageController;