import { sign } from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
const { check } = require('express-validator');

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

UserSchema.methods.generateAuthToken = function() { 
  const token = sign({ _id: this._id, group: this.group }, 'privateKey-cahngeMe');
  return token;
}

export const validateUser = [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
];
export default model('User', UserSchema);
