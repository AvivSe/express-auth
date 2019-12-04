import {Router} from 'express';
import bcrypt from 'bcrypt';
import User, {validateUser} from '../models/user.model'
import HttpException, {HttpStatus} from '../exceptions/http.exception';
import {asyncHttpHandlerWrapper, httpValidationWrapper} from "../httpBroker";

const userController = Router();

userController.post('/', httpValidationWrapper(validateUser), asyncHttpHandlerWrapper(async (req, res) => {
    const {email, password} = req.body;

    if (!!await User.findOne({email})) {
        throw new HttpException('User already exists.', HttpStatus.CONFLICT)
    }

    const user = new User({
        email,
        password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        email,
    });
}));

export default userController;
