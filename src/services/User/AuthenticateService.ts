import { User } from "../../models/Users";

interface IAuthenticateService {
  number: string;
  wa_name: string;
  jid: string;
}

class AuthenticateService{
  async execute({ number, wa_name, jid }: IAuthenticateService){    
    const user = await User.findOne({ number, jid });

    if(user)
      return await User.create({ wa_name, number, jid });
    
    user.wa_name = wa_name;
    await User.updateOne(user._id, { wa_name });

    return user;
  }
}
export { AuthenticateService };