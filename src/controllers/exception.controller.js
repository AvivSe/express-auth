import {userExceptionToHttpException} from "../handlers/user.excpetion.map";
import {authExceptionToHttpException} from "../handlers/auth.exception.map";
import HttpException from "../exceptions/http.exception";

const handlerNameToExceptionMap = {
  'User' : userExceptionToHttpException,
  'Auth' : authExceptionToHttpException,
};

export const genericExceptionsHandler = handlerName => (err, req, res, next) => {
  const exceptionsMap = handlerNameToExceptionMap[handlerName];

  if (typeof err === 'string' && !!exceptionsMap && !!(err = new HttpException(exceptionsMap[err]))) {
    console.warn(`${handlerName} exception handler: ${err.message || "something went wrong."}`);
    res.status(err.status).send(err.message);
  } else {
    return next(err); // letting the default exception handler handle non status code exceptions
  }
};

export default (err, req, res, next) => {
  console.warn(`Exception handler: ${!!err && JSON.stringify(err) || "something went wrong."}`);

  if (!err.status) {
    return next(err); // letting the default exception handler handle non status code exceptions
  }

  res.status(err.status).send(err);
}
