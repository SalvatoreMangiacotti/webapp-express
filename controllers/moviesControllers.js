// Database

const connection = require('../data/db')


// Index

const index = (req, res) => {

    // Query request

    const moviesSql = `
    SELECT * 
    FROM movies
    `

    connection.query(moviesSql, (err, results) => {

        // Query error

        if (err) return res.status(500).json({ error: 'Database query failed' });


        const movies = results.map(movie => {

            return {

                ...movie,
                image: req.imagePath + movie.image

            }

        })

        res.json(movies);

    })

}


// Show

const show = (req, res) => {

    // Params ID

    const { id } = req.params;

    // Query request

    const movieDetails = `
    SELECT * 
    FROM movies 
    WHERE movies.id = ?
    `

    const movieDetailsSql = `
    SELECT * 
    FROM reviews 
    WHERE reviews.movie_id = ?
    `

    connection.query(movieDetails, [id], (err, results) => {

        // Query error

        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (results.length === 0) return res.status(404).json({ error: 'Movie Details not found' });


        const movie = results[0];

        connection.query(movieDetailsSql, [id], (err, results) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });

            movie.reviews = results;

            res.json(movie);

        })

    })

}


// // Store

// const store = (req, res) => {

// }


// // Update

// const update = (req, res) => {

// }


// // Modify

// const modify = (req, res) => {

// }


// Destroy

// const destroy = (req, res) => {

// }


module.exports = {
    index,
    show,
    // store,
    // update,
    // modify,
    // destroy
}