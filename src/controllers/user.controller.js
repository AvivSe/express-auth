import { Router } from 'express';
const { validationResult } = require('express-validator');
import bcrypt from 'bcrypt';
import User, { validateUser } from '../models/user.model'
import HttpException, { HttpStatus } from '../http.exception';
const userController = Router();

userController.post('/', validateUser, async (req, res, next) => {
    const validationTestResult = validationResult(req);

    if(!validationTestResult.isEmpty()) {
        return next(new HttpException("Invalid arguments.", HttpStatus.BAD_REQUEST, validationTestResult.errors))
    }

    const { email, password } = req.body;

    if (!! await User.findOne({ email })) {
        return next(new HttpException("User already exists.", HttpStatus.CONFLICT))
    }

    const user = new User({
        email,
        password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
        _id: user._id,
        email,
    });
});

export default userController;