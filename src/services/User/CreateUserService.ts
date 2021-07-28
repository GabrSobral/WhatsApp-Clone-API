import { sign } from "jsonwebtoken";
import { User } from "../../models/Users";
import handleGenerateJWT from "../../utils/handleGenerateJWT";

interface ICreateUserService {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ email, name, password }: ICreateUserService) {
    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      throw new Error("User already exists status:400");
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    user.isOnline = true;
    await user.save();
    user.password = undefined;

    const token = handleGenerateJWT(user);

    return { user, token };
  }
}
export default new CreateUserService();
