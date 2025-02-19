import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState(""); // State to hold the email input
  const [text, setText] = useState(""); // State to hold the text response from the API
  const [loading, setLoading] = useState(false); // Loading state for the API call

  const handleButtonClick = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // Call the backend API with the email
      const response = await axios.get(`http://localhost:5000/get-temp-mail`, {
        params: {
          email: email, // Pass email as query parameter
        },
      });

      // Assuming the response has a 'mail' field containing the email data
      setText(JSON.stringify(response.data, null, 2)); // Display the full response for debugging
    } catch (error) {
      console.error("Error fetching temp mail:", error); // Log any error
      setText("Failed to fetch temp mail data");
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <TextField
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state on change
        variant="outlined"
        style={{ marginRight: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Loading..." : "Get Temp Mail"}
      </Button>

      <div style={{ marginTop: "20px" }}>
        {text && <pre>{text}</pre>} {/* Display the API response */}
      </div>
    </div>
  );
};

export default App;
