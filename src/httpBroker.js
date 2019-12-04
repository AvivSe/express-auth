import {validationResult} from "express-validator";
import HttpException, {HttpStatus} from "./exceptions/http.exception";

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
