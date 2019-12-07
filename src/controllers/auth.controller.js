import {Router} from 'express';
import {genericExceptionsHandler} from "./exception.controller";

const authController = Router();

authController.get('/', (req, res) => {
    res.send("Hello auth ");
});

authController.use(genericExceptionsHandler('Auth'));

export default authController;
