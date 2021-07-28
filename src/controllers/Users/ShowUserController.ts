import { Request, Response } from "express";
import ShowUserService from "../../services/User/ShowUserService";

class ShowUserController{
  async handle(request: Request, response: Response){
    const user_id = request.params.id
    const user = await ShowUserService.execute(user_id)

    return response.json(user)
  }
}
export default new ShowUserController()