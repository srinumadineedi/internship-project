import React, { useState, useEffect } from "react";
import { getConversations } from "../api/conversationAPI";
import { useNavigate } from "react-router-dom";
import { Container, List, ListItem, ListItemText, Typography, Paper } from "@mui/material";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const userId = 28; // Dummy logged-in user (Replace with authentication)

    useEffect(() => {
        const fetchConversations = async () => {
            const data = await getConversations(userId);
            setConversations(data);
        };
        fetchConversations();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>📩 Your Conversations</Typography>
            <Paper elevation={3}>
                <List>
                    {conversations.map((conv) => (
                        <ListItem 
                            button 
                            key={conv.conversation_id} 
                            onClick={() => navigate(`/messages?conversation_id=${conv.conversation_id}`)}
                        >
                            <ListItemText 
                                primary={`Chat with User ${conv.user2_id === userId ? conv.user1_id : conv.user2_id}`} 
                                secondary={`Started at ${new Date(conv.created_at).toLocaleDateString()}`} 
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default Conversations;
