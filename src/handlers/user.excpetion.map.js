import {HttpStatus} from "../httpBroker";

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

