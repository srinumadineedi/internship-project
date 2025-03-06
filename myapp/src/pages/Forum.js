import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { Delete as DeleteIcon } from "@mui/icons-material"; // Import Delete icon
import { Link } from "react-router-dom"; // Import Link for navigation

// Styled Components (same as before, but keeping them for completeness)
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  textAlign: "center",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  alignItems: "flex-start",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledPostButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      user: "Alice",
      message: "How do I integrate API in React?",
      timestamp: moment().subtract(2, "days").toDate(),
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      id: 1, // Unique ID for each post
    },
    {
      user: "Bob",
      message: "Best UI libraries for modern web apps?",
      timestamp: moment().subtract(1, "day").toDate(),
      avatar: "https://mui.com/static/images/avatar/2.jpg",
      id: 2, // Unique ID for each post
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [nextPostId, setNextPostId] = useState(3); // Initialize the next available ID

  const handlePost = () => {
    const newPostData = {
      user: "You",
      message: newPost,
      timestamp: new Date(),
      avatar: "https://mui.com/static/images/avatar/3.jpg",
      id: nextPostId, // Assign the next available ID
    };
    setPosts([newPostData, ...posts]);
    setNewPost("");
    setNextPostId(nextPostId + 1); // Increment the next available ID
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h5">Forum</StyledTitle>
      <List>
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <StyledListItem alignItems="flex-start">
              <StyledAvatar alt={post.user} src={post.avatar} />
              <ListItemText
                primary={post.user}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {post.message}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {moment(post.timestamp).fromNow()}
                    </Typography>
                  </>
                }
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(post.id)}
                edge="end" // Position the icon to the right edge
              >
                <DeleteIcon />
              </IconButton>
            </StyledListItem>
            {index < posts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <TextField
        fullWidth
        label="Post a question..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        multiline
        rows={3}
      />
      <StyledPostButton onClick={handlePost} variant="contained">
        Post
      </StyledPostButton>

      {/* Back to Home Button */}
      <Box mt={3} textAlign="center">
        <Button
          variant="outlined" // Use outlined style for secondary action
          color="primary"
          component={Link}
          to="/home"
        >
          Back to Home
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default Forum;