import { sign } from "jsonwebtoken";
import { IUser } from "../models/Users";

class handleGenerateJWT {
  handle(user: IUser) {
    const jwtSecret = process.env.TOKEN_SECRET;
    const token = sign({ id: user._id }, jwtSecret, { expiresIn: 86400 });
    return token;
  }
}
export default new handleGenerateJWT().handle;
