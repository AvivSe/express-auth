import HttpException, {HttpStatus} from "../exceptions/http.exception";

export const UserExceptions = {
  CONFLICT: "CONFLICT",
  NO_SUCH_ENTITY: "NO_SUCH_ENTITY",
  PUT_FAILED: "PUT_FAILED",

};

export const userExceptionToHttpException = {
  CONFLICT: {status: HttpStatus.CONFLICT, message: "User already exits"},
  NO_SUCH_ENTITY: {status: HttpStatus.NOT_FOUND, message: "No such entity"},
  PUT_FAILED: { status: HttpStatus.INTERNAL, message: "Something went wrong."}
};

export default (err, req, res, next) => {
  if (typeof err === 'string' && !!userExceptionToHttpException[err] && (err = new HttpException(userExceptionToHttpException[err]))) {
    console.warn(`User Exception handler: ${err.message || "something went wrong."}`);
    res.status(err.status).send(err.message);
  } else {
    return next(err); // letting the default exception handler handle non status code exceptions
  }
}
