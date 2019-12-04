import {HttpStatus} from "../../src/exceptions/http.exception";
import {doPost} from "./http.util";
import {Message} from "../test.consts";

describe('User', () => {

    it('should fail with bad request create a new user', async () => {
        const res = await doPost({
            email: 1,
            password: '12345',
        });
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);

        const {message, errors} = JSON.parse(res.text);
        expect(message).toBe(Message.INVALID_ARGUMENTS);
        expect(errors && errors.length).toBeGreaterThan(0);
        expect(errors.findIndex(error => error.param === 'email')).toBeGreaterThan(-1);

    });
});
