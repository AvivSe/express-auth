import {HttpStatus} from "../util/http-broker";

export const AuthExceptions = {
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_MATCH: "INVALID_MATCH",
};

export const authExceptionToHttpException = {
  INVALID_TOKEN: {status: HttpStatus.UNAUTHORIZED, message: "Unauthorized"},
  INVALID_MATCH: {status: HttpStatus.BAD_REQUEST, message: "Invalid match"},
};
