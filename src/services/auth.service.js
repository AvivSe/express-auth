import {sign} from 'jsonwebtoken';

class AuthService {

  static generateAuthToken(user) {
    return sign({_id: user._id, group: user.group}, 'privateKey-cahngeMe');
  };

}
export default AuthService;
