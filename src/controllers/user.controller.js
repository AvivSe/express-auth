import {Router} from 'express';
import bcrypt from 'bcrypt';
import User, {validateUser} from '../models/user.model'
import HttpException, {HttpStatus} from '../exceptions/http.exception';
import {asyncHttpHandlerWrapper, httpValidationWrapper} from "../httpBroker";
import service from "../services/user.service";

const userController = Router();

userController.post('/', httpValidationWrapper(validateUser),
    asyncHttpHandlerWrapper(async ({ body: user}, res) => {
        const {email} = user;

        try {
            user = await service.createUser(user);
        } catch (e) {
            throw new HttpException(e);
        }

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send({
            _id: user._id,
            email,
        });
    }));

export default userController;
