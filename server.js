const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// POST endpoint to proxy API POST requests
app.post('/proxy/post', async (req, res) => {
  try {
    const { url, params } = req.body;

    // Make a POST request to the provided URL with custom parameters
    const response = await axios.post(url, params);

    // Return the response from the API
    res.json(response.data);
  } catch (error) {
    // If there's an error, return an error message
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint to proxy API GET requests
app.get('/proxy/get', async (req, res) => {
  try {
    const { url } = req.query;
    console.log(url);
    // Make a GET request to the provided URL
    const response = await axios.get(url);

    // Return the response from the API
    res.json(response.data);
  } catch (error) {
    // If there's an error, return an error message
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
