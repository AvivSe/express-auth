import {sign} from 'jsonwebtoken';
import {model, Schema} from 'mongoose';

const {check} = require('express-validator');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    group: String,
});

UserSchema.methods.generateAuthToken = function () {
    return sign({_id: this._id, group: this.group}, 'privateKey-cahngeMe');
};

export const validateUser = [
    check('email').isEmail(),
    check('password').isLength({min: 5})
];
export default model('User', UserSchema);
