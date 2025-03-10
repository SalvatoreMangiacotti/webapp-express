/* Express */

const express = require('express')

const app = express()

const port = 3000


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


// Server Start

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})