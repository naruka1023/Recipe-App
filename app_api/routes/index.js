var express = require('express');
var router = express.Router();
var ctrlRecipe = require('../controllers/recipe');
var ctrlReviews = require('../controllers/reviews');


router.get('/recipe', ctrlRecipe.recipeList);
router.post('/recipe', ctrlRecipe.createRecipe);
// router.put('/recipe', ctrlRecipe.updateOneRecipe);
// // reviews
// router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
// router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
// router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
// router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
