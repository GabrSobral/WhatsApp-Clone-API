import { User } from "../../models/Users";
import handleGenerateJWT from "../../utils/handleGenerateJWT";

interface ICreateUserService {
  name: string;
  phoneNumber: string;
}

class CreateUserService {
  async execute({ name, phoneNumber }: ICreateUserService) {
    const alreadyExists = await User.findOne({ phoneNumber });

    if (alreadyExists)
      throw new Error("User already exists status:400");

    console.log(name, phoneNumber);
    
    const user = await User.create({ name, phoneNumber });
    const token = handleGenerateJWT(user);

    return { user, token };
  }
}
export { CreateUserService };
