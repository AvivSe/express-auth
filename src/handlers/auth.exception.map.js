import {HttpStatus} from "../httpBroker";

export const AuthExceptions = {
  INVALID_TOKEN: "INVALID_TOKEN",
};

export const authExceptionToHttpException = {
  INVALID_TOKEN: {status: HttpStatus.UNAUTHORIZED, message: "Unauthorized"},
};
