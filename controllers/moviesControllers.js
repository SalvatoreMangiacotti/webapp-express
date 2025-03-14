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

    const moviesSql = `
    SELECT * 
    FROM movies 
    WHERE movies.id = ?
    `

    const movieDetailsSql = `
    SELECT * 
    FROM reviews 
    WHERE reviews.movie_id = ?
    `

    connection.query(moviesSql, [id], (err, results) => {

        // Query error

        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (results.length === 0) return res.status(404).json({ error: 'Movie Details not found' });


        const movie = results[0];

        connection.query(movieDetailsSql, [id], (err, results) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });

            movie.reviews = results;

            // Images path

            movie.image = req.imagePath + movie.image

            // Result

            res.json(movie);

        })

    })

}

// Store Review

const storeReview = (req, res) => {

    // Id from params

    const { id } = req.params;

    // Info from body

    const { text, name, vote } = req.body;

    const insertReviewSql = `
    INSERT INTO reviews (name, vote, text, movie_id)
    VALUES(?, ?, ?, ?)
    `

    connection.query(insertReviewSql, [name, vote, text, id], (err, results) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });

        res.status(201);

        res.json({ message: 'Review added', id: results.insertId });

    })

}


// Store

const store = (req, res, next) => {

    const { title, director, abstract } = req.body;

    // handle name file value created from middleware

    const imageName = `${req.file.filename}`;

    // Insert query

    const query = `
    INSERT INTO movies (title, director, image, abstract)
    VALUES(?, ?, ?, ?)
    `

    connection.query(query, [title, director, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Server internal error"));
            }

            res.status(201).json({
                status: "success",
                message: "Movie created - success!"
            })
        }
    )

}


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
    storeReview,
    store,
    // update,
    // modify,
    // destroy
}