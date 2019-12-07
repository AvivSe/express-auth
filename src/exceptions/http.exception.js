export default class HttpException {
    constructor({message, status, errors}) {
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
}
