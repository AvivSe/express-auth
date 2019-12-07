import {Router} from 'express';
import {genericExceptionsHandler} from "./exception.controller";
import service from "../services/auth.service";
import {asyncHttpHandlerWrapper} from "../util/http-broker";
const authController = Router();

authController.get('/', (req, res) => {
    res.send("Hello auth ");
});

authController.post('/', asyncHttpHandlerWrapper(async ({ body }, res) => {
    const { email, password } =  body;
    const {user, token} = await service.login(email, password);
    res.header('x-auth-token', token).send(user);
}));
authController.use(genericExceptionsHandler('Auth'));

export default authController;
