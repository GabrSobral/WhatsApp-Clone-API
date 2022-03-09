import { Request, Response } from "express";

import { AuthenticateService } from "../services/User/AuthenticateService";
import { DeleteUserService } from "../services/User/DeleteUserService";
import { ListUsersService } from "../services/User/ListUsersService";
import { LogoutUserService } from "../services/User/LogoutUserService";
import { ShowUserService } from "../services/User/ShowUserService";

export class UserController {
  async SignIn(request: Request, response: Response){
    const { number, wa_name, jid } = request.body;

    const service = new AuthenticateService();
    const user_and_token = await service.execute({ number, wa_name, jid });
    return response.json(user_and_token);
  }

  async Show(request: Request, response: Response) {
    const { phoneNumber } = request.body

    const service = new ShowUserService();
    const user = await service.execute(phoneNumber)
    return response.json(user)
  }

  async List(request: Request, response: Response) {
    const service = new ListUsersService();
    const users = await service.execute();
    return response.json(users);
  }

  async Delete(request: Request, response: Response) {
    const user_id = request.params.id

    const service = new DeleteUserService();
    await service.execute(user_id)
    return response.sendStatus(200)
  }

  async LogOut(request: Request, response: Response) {
    const user_id = request.user_id;

    const service = new LogoutUserService();
    await service.execute(user_id)
    return response.sendStatus(200)
  }
}