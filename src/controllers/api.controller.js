import {Router} from 'express';
import authController from './auth.controller';
import userController from './user.controller';

const apiController = Router();

apiController.use('/auth', authController);
apiController.use('/user', userController);

export default apiController;
