import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaPaperPlane, FaImage } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #232526, #414345); /* Unique Background */
`;

const ChatBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background: ${({ isUser }) => (isUser ? "#ff4081" : "#444")};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  text-align: ${({ isUser }) => (isUser ? "right" : "left")};
  max-width: 75%;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
`;

const MessageImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  margin-top: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
`;

const SendButton = styled.button`
  background: #ff4081;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2rem;

  &:hover {
    background: #ff1a5e;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  background: #ffcc00;
  color: black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 1.2rem;

  &:hover {
    background: #e6b800;
  }
`;

const TypingIndicator = styled.p`
  font-size: 0.9rem;
  color: #ffcc00;
  text-align: left;
  margin-left: 10px;
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, isUser: true, type: "text" };
      setMessages([...messages, newMessage]);
      console.log("User Message:", newMessage);
      setInput("");
      setTyping(false);
      scrollToBottom();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newMessage = { text: imageUrl, isUser: true, type: "image" };
      setMessages([...messages, newMessage]);
      console.log("User Shared Image:", newMessage);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Container>
      <ChatBox>
        <h2>Chat with Pet Owners 🐾</h2>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              {msg.type === "text" ? msg.text : <MessageImage src={msg.text} alt="Shared" />}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        {typing && <TypingIndicator>Typing...</TypingIndicator>}

        <InputContainer>
          <FileLabel onClick={() => fileInputRef.current.click()}>
            <FaImage />
          </FileLabel>
          <FileInput type="file" ref={fileInputRef} accept="image/*" onChange={handleFileUpload} />
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setTyping(true);
              setTimeout(() => setTyping(false), 2000);
            }}
          />
          <SendButton onClick={handleSend}>
            <FaPaperPlane />
          </SendButton>
        </InputContainer>
      </ChatBox>
    </Container>
  );
};

export default Chat;
