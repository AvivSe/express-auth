export const HttpStatus = {
    OK: 200,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    CREATED: 201,
    INTERNAL: 500,
}
export default class HttpException {
    constructor(message, status, errors) {
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
}