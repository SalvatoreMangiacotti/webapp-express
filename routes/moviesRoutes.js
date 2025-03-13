const express = require('express');

const router = express.Router();


// Destructuring

const { index, show, storeReview, store, update, modify, destroy } = require('../controllers/moviesControllers');


// Index

router.get('/', index);


// Show

router.get('/:id', show);


// Store

router.post('/:id/reviews', storeReview);


// // Update

// router.post('/:id', update);


// // Modify

// router.patch('/:id', modify);


// Destroy

// router.delete('/:id', destroy);


module.exports = router;