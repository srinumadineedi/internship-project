import React, { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../api/messageAPI";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    IconButton,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate, useSearchParams } from "react-router-dom";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const conversation_id = searchParams.get("conversation_id");

    // Replace with your actual user ID retrieval method (e.g., from localStorage)
    const userId = 123;

    const POLLING_INTERVAL = 5000;
     useEffect(() => {
        if (conversation_id) {
            const fetchMessagesAndUpdate = async () => {
                try {
                    const data = await getMessages(conversation_id);
                    setMessages(data);
                    scrollToBottom();
                } catch (error) {
                    console.error("Error fetching messages:", error);
                    // Improved error display (optional)
                    setMessages([{ message_id: -1, content: "Error loading messages." }]);
                }
            };

            fetchMessagesAndUpdate(); // Initial fetch

            const intervalId = setInterval(fetchMessagesAndUpdate, POLLING_INTERVAL); // Polling

            return () => clearInterval(intervalId); // Cleanup
        } else {
            console.warn("Conversation ID is missing, skipping message fetch.");
        }
    }, [conversation_id, getMessages]); // Ensure getMessages is stable

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            sender_id: userId,
            receiver_id: 32,
            content: newMessage,
            conversation_id,
        };

        try {
            await sendMessage(messageData);
            setNewMessage("");
            // Optionally, clear the error message on successful send
            // setErrorMessage(null);
        } catch (error) {
            console.error("Error sending message:", error);
            //setErrorMessage("Failed to send message. Please try again.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
            {/* Back Button */}
            <IconButton onClick={() => navigate("/")} sx={{ position: "absolute", left: 20, top: 20 }}>
                <ArrowBackIcon />
            </IconButton>

            <Typography variant="h4" gutterBottom>💬 Messages</Typography>

            {/* Chat Messages */}
            <Paper elevation={3} sx={{ height: "500px", overflowY: "auto", padding: 2, mb: 2, borderRadius: "10px" }}>
                {messages.map((msg) => (
                    <ListItem key={msg.message_id} alignItems="flex-start" sx={{
                        bgcolor: msg.sender_id === userId ? "#E8F5E9" : "#F5F5F5",
                        borderRadius: "8px",
                        mb: 1,
                        width: "95%",
                        alignSelf: msg.sender_id === userId ? 'flex-end' : 'flex-start',
                    }}>
                        <ListItemAvatar>
                            <Avatar alt={`User ${msg.sender_id}`} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle2" style={{ fontWeight: 'bold', color: msg.sender_id === userId ? '#2E7D32' : '#1A237E' }}>
                                    {msg.sender_id === userId ? "You" : `User ${msg.sender_id}`}
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {msg.content}
                                    </Typography>
                                    <br />
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
                <div ref={messagesEndRef} />
            </Paper>

            {/* Message Input */}
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <TextField
                    fullWidth
                    label="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button variant="contained" color="primary" onClick={handleSend}>
                    <SendIcon />
                </Button>
            </Box>
        </Container>
    );
};

export default Messages;