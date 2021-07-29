import { Request, Response } from "express";
import ListRoomsService from "../../services/Room/ListRoomsService";

class ListRoomsController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id
    const rooms = await ListRoomsService.execute(user_id);

    return response.json(rooms);
  }
}
export default new ListRoomsController();
