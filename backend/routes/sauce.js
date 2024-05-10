const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/sauce');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);

// router.post('/:id', auth, stuffCtrl.getLikes);

// GET /api/sauces - Array of sauces Returns an array of all sauces in the database. 
// GET /api/sauces/:id - Single sauce Returns the sauce with the provided _id.
// POST /api/sauces { sauce: String, image: File } { message: String } Verb
//     Captures and saves the image, parses stringified sauce, and saves it to the database, setting its
//     imageUrl correctly. Initializes sauces likes and dislikes to 0, and usersLiked and usersDisliked 
//     to empty arrays. Note that the initial body request is empty; when multer is added, it returns 
//     a string for the body request based on the data submitted with the file.

// PUT /api/sauces/:id EITHER Sauce as JSON OR { sauce:String, image: File }{ message: String } 
// Updates the sauce with the provided _id. If an image is uploaded, capture it, andupdate the sauces imageUrl.
// If there are no files, the sauce details are directly within the request body 
// (req.body.name,req.body.heat, etc.). 
// If a file is provided, the stringified sauce is in req.body.sauce. Note that the initial body request is 
// empty; when multer is added, it returns a string of the body request based on the data submitted with the file.

// DELETE /api/sauces/:id - { message: String } Deletes the sauce with the provided _id.

// POST /api/sauces/:id/like { userId: String, like: Number } { message: String } 
//     Sets “like'' status for the userId provided. If like = 1, the user likes the sauce. If like = 0, the user 
//     is canceling their like or dislike. If like = -1, the user dislikes the sauce. The user's ID must be
//     added to or removed from the appropriate array. This keeps track of their preferences and prevents them 
//     from liking or disliking the same sauce multiple times: one user can only have one value for each
//     sauce. Total number of likes and dislikes to be updated with each like.
    

module.exports = router;