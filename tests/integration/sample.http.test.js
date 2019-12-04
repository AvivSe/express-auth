import request from 'supertest';
import server from '../../src/server';
import {HttpStatus} from "../../src/exceptions/http.exception";
describe('User', () => {
    it('should fail with bad request create a new user', async () => {
        const res = await request(server)
            .post('/api/user')
            .send({
                email: 1,
                password: '1',
            });
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    })
});
