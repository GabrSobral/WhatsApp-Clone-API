import { Request, Response } from "express";
import ListUsersService from "../../services/User/ListUsersService";

class ListUsersController{
  async handle(request: Request, response: Response){
    const users = await ListUsersService.execute()

    return response.json(users)
  }
}
export default new ListUsersController()