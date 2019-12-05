import {doPost, exceptInvalidArgument} from "./http.util";
import {Fields} from "../test.consts";

const validUser = {
    email: 'test@express.auth',
    password: '12345',
};

const invalidUser = {
    email: '@',
    password: '1'
};

describe('User', () => {
    Object.values(Fields).forEach(field => {
        it(`should fail with bad request create a new user when ${field} is invalid`, async () => {
            exceptInvalidArgument(field, await doPost({
                ...validUser, [field]: invalidUser[field]
            }));
        });
    });
});
