import { Request, Response } from "express";
import ListStatusToMeService from "../../services/Status/ListStatusToMeService";

class ListStatusToMeController {
  async handle(request: Request, response: Response) {
    const my_id = request.user_id

    const statusToMe = await ListStatusToMeService.execute(my_id)

    return response.json(statusToMe)
  }
}
export default new ListStatusToMeController()