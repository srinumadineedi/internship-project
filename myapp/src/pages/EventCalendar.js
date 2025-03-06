// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
// } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import styled from "styled-components";
// const EventContainer = styled(Container)`
//   background: white;
//   padding: 2rem;
//   border-radius: 10px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   margin-top: 80px;
//   position: relative;
// `;

// const BackButton = styled(IconButton)`
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   background: #4a90e2;
//   color: white;
//   &:hover {
//     background: #357abd;
//   }
// `;

// const EventCard = styled(Card)`
//   border-radius: 10px;
//   transition: transform 0.3s ease-in-out;
//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const EventCalendar = () => {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     console.log("Fetching events...");

//     try {
//       const response = await fetch("http://localhost:5000/api/events"); // Backend API
//       const data = await response.json();
//       console.log("Fetched Events:", data);
//       setEvents(data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   return (
//     <EventContainer maxWidth="md">
//       <BackButton onClick={() => navigate("/home")}>
//         <ArrowBack />
//       </BackButton>

//       <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
//         Upcoming Pet Events & Meetups
//       </Typography>

//       {/* Calendar View */}
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events.map((event) => ({
//           title: event.title,
//           date: event.date,
//         }))}
//         height="500px"
//       />

//       {/* List of Events */}
//       <Typography variant="h5" fontWeight="bold" sx={{ marginTop: "2rem" }}>
//         Event List
//       </Typography>
//       <Grid container spacing={2}>
//         {events.length > 0 ? (
//           events.map((event) => (
//             <Grid item xs={12} sm={6} key={event.id}>
//               <EventCard>
//                 <CardContent>
//                   <Typography variant="h6">{event.title}</Typography>
//                   <Typography>Date: {event.date}</Typography>
//                   <Typography>Location: {event.location}</Typography>
//                   <Typography>Description: {event.description}</Typography>
//                 </CardContent>
//               </EventCard>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h6" textAlign="center" sx={{ marginTop: "2rem" }}>
//             No upcoming events.
//           </Typography>
//         )}
//       </Grid>
//     </EventContainer>
//   );
// };

// export default EventCalendar;
