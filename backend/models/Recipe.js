const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: [{ // This is an array of strings
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    user: { // This links the recipe to a user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the 'User' model we just made
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);