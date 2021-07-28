import { Request, Response } from "express";
import DeleteUserService from "../../services/User/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const user_id = request.params.id

    await DeleteUserService.execute(user_id)
  }
}
export default new DeleteUserController()