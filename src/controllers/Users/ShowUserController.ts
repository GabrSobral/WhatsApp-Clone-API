import { Request, Response } from "express";
import ShowUserService from "../../services/User/ShowUserService";

class ShowUserController{
  async handle(request: Request, response: Response){
    const { email } = request.body

    const user = await ShowUserService.execute(email)

    return response.json(user)
  }
}
export default new ShowUserController()