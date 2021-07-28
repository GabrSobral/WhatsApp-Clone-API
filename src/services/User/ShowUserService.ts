import { User } from "../../models/Users";

class ShowUserService{
  async execute(user_id: string){
    const user = User.findById(user_id)

    if(!user) {
      throw new Error('User not found')
    }

    return user
  }
}
export default new ShowUserService()