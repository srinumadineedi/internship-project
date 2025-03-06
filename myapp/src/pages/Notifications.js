import React, { useState } from "react";
import styled from "styled-components";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url("https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg") no-repeat center center/cover;
  padding: 20px;
`;


const NotificationsBox = styled.div`
  background: linear-gradient(to right, #ff9966, #ff5e62);
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

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const NotificationList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotificationCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
  width: 90%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NotificationText = styled.div`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: ${({ accept }) => (accept ? "#2ecc71" : "#e74c3c")};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;

  &:hover {
    background: ${({ accept }) => (accept ? "#27ae60" : "#c0392b")};
  }
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "match", text: "Buddy wants to match with your pet!" },
    { id: 2, type: "message", text: "You have a new message from John Doe." },
  ]);

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
    console.log("Updated Notifications:", updatedNotifications);
  };

  return (
    <Container>
      <NotificationsBox>
        <Title>🔔 Notifications</Title>

        <NotificationList>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <NotificationCard key={notif.id}>
                <NotificationText>{notif.text}</NotificationText>
                <ButtonGroup>
                  {notif.type === "match" ? (
                    <>
                      <Button accept onClick={() => removeNotification(notif.id)}>
                        <FaCheck />
                      </Button>
                      <Button onClick={() => removeNotification(notif.id)}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => removeNotification(notif.id)}>
                      <FaTimes />
                    </Button>
                  )}
                </ButtonGroup>
              </NotificationCard>
            ))
          ) : (
            <p>No new notifications 🎉</p>
          )}
        </NotificationList>
      </NotificationsBox>
    </Container>
  );
};

export default Notifications;
