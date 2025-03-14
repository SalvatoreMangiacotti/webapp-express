const multer = require("multer");

const storage = multer.diskStorage({

    // Storage

    destination: './public/img/movies/',

    // Original name gets renamed with the timestamp of the server date

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName)
    }

})

const upload = multer({ storage });

module.exports = upload;