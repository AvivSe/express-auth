import jwt, {sign} from 'jsonwebtoken';
import {AuthExceptions} from "../handlers/auth.exception.map";

const privateKey = 'change-me';

class AuthService {

  static generateAuthToken(user) {
    return sign({_id: user._id, group: user.group}, privateKey, {expiresIn: '1h'});
  };

  static isAuthenticate(token) {
    try {
      const decoded = jwt.verify(token, privateKey);
      console.log(decoded);
      return true;
    } catch (ex) {
      throw AuthExceptions.INVALID_TOKEN;
    }
  };

}
export default AuthService;
