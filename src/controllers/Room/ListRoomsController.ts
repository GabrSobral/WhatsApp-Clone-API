import { Request, Response } from "express";
import ListRoomsService from "../../services/Room/ListRoomsService";

class ListRoomsController {
  async handle(request: Request, response: Response) {
    const rooms = await ListRoomsService.execute();

    return response.json(rooms);
  }
}
export default new ListRoomsController();
