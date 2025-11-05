const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// --- ADD THIS MIDDLEWARE ---
// This allows our app to accept JSON data in request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('RecipeShare Backend is running!');
});

// --- ADD THIS LINE TO USE YOUR ROUTES ---
// Any URL starting with /api/recipes will be handled by recipeRoutes
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});