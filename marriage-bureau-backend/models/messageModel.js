import pool from "../config/db.js";

const Message = {
    getAll: async () => {
        try {
            const query = 'SELECT * FROM public."Message" ORDER BY message_id ASC';
            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    getMessagesByConversationId: async (conversationId) => {
        try {
            const query = `SELECT * FROM public."Message" WHERE conversation_id = $1 ORDER BY timestamp ASC`;
            const values = [conversationId];
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error("Error fetching messages by conversation ID:", error);
            throw error;
        }
    },

    createMessage: async (sender_id, receiver_id, content, conversation_id, image_url = null) => {
        try {
            const query = `
                INSERT INTO public."Message" (sender_id, receiver_id, content, timestamp, image_url, conversation_id)
                VALUES ($1, $2, $3, NOW(), $4, $5)
                RETURNING *;
            `;
            const values = [sender_id, receiver_id, content, image_url, conversation_id];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error creating message:", error);
            throw error;
        }
    },
};

export default Message;