import {Router} from 'express';
import {validateUser} from '../models/user.model'
import HttpException from '../exceptions/http.exception';
import {asyncHttpHandlerWrapper, httpValidationWrapper} from "../httpBroker";
import service from "../services/user.service";
import UserExceptionController from './user.excpetion.controller';
const userController = Router();

userController.post('/', httpValidationWrapper(validateUser),
    asyncHttpHandlerWrapper(async ({ body: user}, res) => {
        const {email} = user;
        user = await service.createUser(user);
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send({
            _id: user._id,
            email,
        });
    })
);

userController.use(UserExceptionController);
export default userController;
