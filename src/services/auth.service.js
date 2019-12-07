import jwt, {sign} from 'jsonwebtoken';
import {AuthExceptions} from "../exceptions/auth.exception.map";
import userService from './user.service'
import hashPassword from '../util/hash-password'
const privateKey = 'change-me';

class AuthService {

  static generateAuthToken(user) {
    return sign({_id: user._id, group: user.group}, privateKey, {expiresIn: '1h'});
  };

  static isAuthenticate(token) {
    try {
      return  jwt.verify(token, privateKey);
    } catch (ex) {
      throw AuthExceptions.INVALID_TOKEN;
    }
  };

  static async login(email, password) {
    password = await hashPassword(password);
    const user = await userService.getUser(email);

    if(!user || password !== user.password) {
      throw AuthExceptions.INVALID_MATCH;
    }

    return { user , token: this.generateAuthToken(user) };
  }
}
export default AuthService;
