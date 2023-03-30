import UserModel from '../models/usersModel';

export default class UserService {
  public user = async (email: string) => {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  };
}
