const express = require('express');
const connectDB = require('./db'); // <-- ADD THIS
require('dotenv').config(); // <-- ADD THIS

// Connect to database
connectDB(); // <-- ADD THIS

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('RecipeShare Backend is running!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});