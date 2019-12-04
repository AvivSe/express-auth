import {Router} from 'express';

const authController = Router();

authController.get('/', (req, res) => {
    res.send("Hello auth ");
});

export default authController;
