import {Router} from 'express';
import {validateUser} from '../models/user.model'
import {asyncHttpHandlerWrapper, httpValidationWrapper} from "../httpBroker";
import service from "../services/user.service";
import UserExceptionController from './user.excpetion.controller';
import authService from '../services/auth.service';
import {HttpStatus} from "../exceptions/http.exception";
const userController = Router();

userController.get('/:email', asyncHttpHandlerWrapper(async ({ params }, res) => {
    res.send(await service.getUser(params.email));
  })
);

userController.get('/', asyncHttpHandlerWrapper(async ({ params }, res) => {
    res.send(await service.getUsers());
  })
);

userController.post('/', httpValidationWrapper(validateUser),
    asyncHttpHandlerWrapper(async ({ body: user}, res) => {
        user = await service.createUser(user);
        const token = authService.generateAuthToken(user);
        res.header('x-auth-token', token).status(HttpStatus.CREATED).send(user);
    })
);

userController.put('/:email', asyncHttpHandlerWrapper(async ({ body: update, params}, res) => {
    res.send(await service.putUser(params.email, update));
  })
);

userController.use(UserExceptionController);
export default userController;
