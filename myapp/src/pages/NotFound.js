import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found 😢</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">
        <button style={{ padding: "10px 20px", fontSize: "18px" }}>
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
