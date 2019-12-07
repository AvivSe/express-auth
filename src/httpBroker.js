import {validationResult} from "express-validator";
import HttpException from "./exceptions/http.exception";

export const HttpStatus = {
    OK: 200,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    CREATED: 201,
    INTERNAL: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
};

export const asyncHttpHandlerWrapper = (asyncHttpRequestHandler) => {
    return (req, res, next) => {
        asyncHttpRequestHandler(req, res, next).catch(next);
    }
};

export const httpValidationWrapper = (checkList) => {
    return [...checkList,
        // resolve validations
        (req, res, next) => {
            const validationTestResult = validationResult(req);
            if (!validationTestResult.isEmpty()) {
                throw new HttpException("Invalid arguments.", HttpStatus.BAD_REQUEST, validationTestResult.array())
            } else {
                next();
            }
        },]
};
