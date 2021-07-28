import { Request, Response } from "express";
import ShowRoomService from "../../services/Room/ShowRoomService";

class ShowRoomController {
  async handle(request: Request, response: Response) {
    const room_id = request.params.id;

    const room = await ShowRoomService.execute(room_id);

    return response.json(room);
  }
}
export default new ShowRoomController();
