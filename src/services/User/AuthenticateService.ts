import { User } from "../../models/Users";
import handleGenerateJWT from "../../utils/handleGenerateJWT";

interface IAuthenticateService {
  phoneNumber: string;
}

class AuthenticateService{
  async execute({ phoneNumber }: IAuthenticateService){
    const user = await User.findOne({ phoneNumber });

    if(!user)
      throw new Error("PhoneNumber invalid status:400");

    const token = handleGenerateJWT(user);

    return { user, token };
  }
}
export default new AuthenticateService();