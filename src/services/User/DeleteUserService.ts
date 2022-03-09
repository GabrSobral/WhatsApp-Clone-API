import { User } from "../../models/Users";

class DeleteUserService {
  async execute(user_id: string) {
    await User.findByIdAndDelete(user_id);
    return;
  }
}
export { DeleteUserService };
