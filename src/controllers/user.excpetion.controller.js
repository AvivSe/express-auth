export default (err, req, res, next) => {

  if (!err.status) {
    return next(err); // letting the default exception handler handle non status code exceptions
  } else {
    console.warn(`User Exception handler: ${err.message || "something went wrong."}`);
    res.status(err.status).send(err);
  }

}
