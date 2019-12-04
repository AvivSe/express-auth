export default (err, req, res, next) => {
    console.warn(`Exception handler: ${err.message || "something went wrong."}`);

    if (!err.status) {
        return next(err); // letting the default exception handler handle non status code exceptions
    }

    res.status(err.status).send(err);
}
