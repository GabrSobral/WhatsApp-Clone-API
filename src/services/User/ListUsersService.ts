import { User } from "../../models/Users"

class ListUsersService{
  async execute(){
    const users = await User.find()
    return users
  }
}
export default new ListUsersService()