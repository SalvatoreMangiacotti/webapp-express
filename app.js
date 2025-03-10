/* Express */

const express = require('express')

const app = express()

const port = process.env.PORT

/* Routes */

const moviesRoutes = require('./routes/moviesRoutes')


/* CORS */

// app.use(cors())


// Middleware - Cors Specific Route

// app.use(cors({ origin: 'http://localhost:5173/' }))


// Middleware - Static files

app.use(express.static('public'));


// Middleware - Parsing json

app.use(express.json());


// Main Route

app.get('/', (req, res) => {

    res.send('Movies Server')

})


app.use("/api/movies", moviesRoutes)


// Server Start

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})