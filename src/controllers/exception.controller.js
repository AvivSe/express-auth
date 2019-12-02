import { HttpStatus } from "../http.exception";

export default (err, req, res, next) => {
    console.warn(err.message);
    
    if(!err.status) {
        err.status = HttpStatus.INTERNAL;
    }

    res.status(err.status).send(err);
}