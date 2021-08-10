import { User } from "../../models/Users";

class ShowUserService{
  async execute(email: string){
    email.toLowerCase()
    const user = await User.find({ email })

    if(!user) {
      throw new Error('User not found status:400')
    }

    return user
  }
}
export default new ShowUserService()