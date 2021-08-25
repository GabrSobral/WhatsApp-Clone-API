import { Request, Response } from "express";
import ListMyStatusService from "../../services/Status/ListMyStatusService";

class ListMyStatusController {
  async handle(request: Request, response: Response) {
    const my_id = request.user_id

    const myStatus = await  ListMyStatusService.execute(my_id)

    return response.json(myStatus)
  }
}
export default new ListMyStatusController()