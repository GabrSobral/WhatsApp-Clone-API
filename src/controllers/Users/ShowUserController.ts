import { Request, Response } from "express";
import ShowUserService from "../../services/User/ShowUserService";

class ShowUserController{
  async handle(request: Request, response: Response){
    const { phoneNumber } = request.body

    const user = await ShowUserService.execute(phoneNumber)

    return response.json(user)
  }
}
export default new ShowUserController()