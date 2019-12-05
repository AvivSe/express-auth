import User from "../models/user.model";
import HttpException, {HttpStatus} from "../exceptions/http.exception";

const bcrypt = require("bcrypt");

const createUser = () => {

};
class UserService {

    static async createUser(user) {
        const {email, password} = user;

        if (!!await User.findOne({email})) {
            throw { message: 'User already exists.', status: 409}
        }

        user = new User({
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();
    }
}
export default UserService;
