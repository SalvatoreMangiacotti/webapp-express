function setImagesPath(req, res, next) {

    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies/`;
    next()

}

module.exports = setImagesPath;