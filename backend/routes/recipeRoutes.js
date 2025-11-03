const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Go up one folder, then into models

// @route   GET /api/recipes
// @desc    Get all recipes
router.get('/', async (req, res) => {
    try {
        // Find all recipes and populate the 'user' field with just the 'username'
        const recipes = await Recipe.find().populate('user', 'username');
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/recipes/:id
// @desc    Get a single recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'username');
        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/recipes
// @desc    Create a new recipe
// @access  Private (we'll make this private on Day 2)
router.post('/', async (req, res) => {
    // We need to get the data from the request body
    const { title, ingredients, instructions, imageUrl } = req.body;

    // --- TEMPORARY ---
    // We are hardcoding the user ID for now.
    // On Day 2, we will get this from our authentication token.
    // You must create a user in your DB (using MongoDB Compass) 
    // and paste its _id here.
    const tempUserId = 'YOUR_USER_ID_HERE'; // <-- PASTE A REAL USER _id HERE
    // -------------------

    try {
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            imageUrl,
            user: tempUserId // We will fix this tomorrow
        });

        const recipe = await newRecipe.save();
        res.json(recipe); // Send the new recipe back as a response
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;