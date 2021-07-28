import { Request, Response } from "express";
import DeleteRoomService from "../../services/Room/DeleteRoomService";

class DeleteRoomController {
  async handle(request: Request, response: Response) {
    const room_id = request.params.id;

    await DeleteRoomService.execute(room_id);

    return response.sendStatus(200);
  }
}
export default new DeleteRoomController();
