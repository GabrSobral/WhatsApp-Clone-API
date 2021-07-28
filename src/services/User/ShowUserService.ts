import { User } from "../../models/Users";

class ShowUserService{
  async execute(user_id: string){
    const user = User.findById(user_id)

    if(!user) {
      throw new Error('User not found status:400')
    }

    return user
  }
}
export default new ShowUserService()