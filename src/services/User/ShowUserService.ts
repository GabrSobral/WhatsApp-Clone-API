import { User } from "../../models/Users";

class ShowUserService{
  async execute(phoneNumber: string){
    const user = await User.find({ phoneNumber });

    if(!user)
      throw new Error('User not found status:400');

    return user;
  }
}
export default new ShowUserService()