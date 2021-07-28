import { Request, Response } from "express";
import LogoutUserService from "../../services/User/LogoutUserService";

class LogoutUserController {
  async handle(request: Request, response: Response){
    const user_id = request.user_id;

    await LogoutUserService.execute(user_id)

    return response.sendStatus(200)
  }
}
export default new LogoutUserController()