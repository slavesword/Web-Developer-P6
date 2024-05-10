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

router.post('/:id/like', auth, stuffCtrl.getLikes);



// POST /api/sauces/:id/like { userId: String, like: Number } { message: String } 
//     Sets “like'' status for the userId provided. If like = 1, the user likes the sauce. If like = 0, the user 
//     is canceling their like or dislike. If like = -1, the user dislikes the sauce. The user's ID must be
//     added to or removed from the appropriate array. This keeps track of their preferences and prevents them 
//     from liking or disliking the same sauce multiple times: one user can only have one value for each
//     sauce. Total number of likes and dislikes to be updated with each like.
    

module.exports = router;