import User from "../models/user.model";
import {UserExceptions} from "../exceptions/user.excpetion.map";
import hashPassword from '../util/hash-password'
class UserService {

    static async createUser(user) {
        const {email, password} = user;

        if (!!this.getUser(email)) {
            throw UserExceptions.CONFLICT;
        }

        user = new User({
            email,
            password: await hashPassword(password),
        });

        await user.save();
    }

    static async getUser(email) {
        return User.findOne({email});
    }

    static async getUsers(filters = {}) {
        return User.find();
    }

    static async putUser(email, update) {
        let user;

        if (!await this.getUser(email)) {
            throw UserExceptions.NO_SUCH_ENTITY;
        }

        if (!!update.password) {
            update.password = await hashPassword(update.password)
        }

        if(!(user = await User.findOneAndUpdate({email}, update))) {
            throw UserExceptions.PUT_FAILED;
        }

        return user;
    }
}
export default UserService;
