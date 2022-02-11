import { Request, Response } from "express";
import AuthenticateService from "../../services/User/AuthenticateService";

class AuthenticateController{
  async handle(request: Request, response: Response){
    const { phoneNumber } = request.body

    const user_and_token = await AuthenticateService.execute({ phoneNumber })

    return response.json(user_and_token)
  }
}
export default new AuthenticateController()