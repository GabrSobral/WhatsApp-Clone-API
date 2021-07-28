import { compare } from "bcryptjs";
import { User } from "../../models/Users";
import handleGenerateJWT from "../../utils/handleGenerateJWT";

interface IAuthenticateService {
  email: string;
  password: string;
}

class AuthenticateService{
  async execute({ email, password }: IAuthenticateService){
    const user = await User.findOne({ email })

    if(!user){
      throw new Error("Email/password invalid status:400")
    }
    if(!await compare(password, user.password)){
      throw new Error('Email/password invalid status:400')
    }

    const token = handleGenerateJWT(user)

    return { user, token }
  }
}
export default new AuthenticateService()