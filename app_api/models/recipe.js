var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
    ingredientName: String,
    amount: Number,
    unitOfMeasurement: String
});

var recipeSchema = new mongoose.Schema({
    recipeName: String,
    price: String,
    ingredient: [ingredientSchema],
    createdOn: {
        type: Date,
        "default": Date.now
    },
    createdBy: String
});

module.export = mongoose.model('Recipe', recipeSchema);