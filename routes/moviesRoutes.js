const express = require('express');

const router = express.Router();

// Multer

const upload = require('../middlewares/multer')

// Destructuring

const { index, show, storeReview, store, update, modify, destroy } = require('../controllers/moviesControllers');


// Index

router.get('/', index);


// Show

router.get('/:id', show);


// Store Review

router.post('/:id/reviews', storeReview);

// Store

router.post('/', upload.single('image'), store);


// // Update

// router.post('/:id', update);


// // Modify

// router.patch('/:id', modify);


// Destroy

// router.delete('/:id', destroy);


module.exports = router;