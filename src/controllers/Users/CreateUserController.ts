import { Request, Response } from "express";
import CreateUserService from "../../services/User/CreateUserService";

class CreateUserController{
  async handle(request: Request, response: Response){
    const { name, phoneNumber } = request.body;

    const user = await CreateUserService.execute({
      name, phoneNumber
    });

    return response.json(user);
  }
}
export default new CreateUserController()