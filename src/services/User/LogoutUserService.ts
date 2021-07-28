import { User } from "../../models/Users";

class LogoutUserService {
  async execute(user_id: string) {
    await User.findByIdAndUpdate(user_id, {
      isOnline: false,
      lastOnline: new Date,
    });
  }
}
export default new LogoutUserService();
