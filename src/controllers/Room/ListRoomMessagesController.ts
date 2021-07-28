import { Request, Response } from "express";
import ListRoomMessagesService from "../../services/Room/ListRoomMessagesService";

class ListRoomMessagesController {
  async handle(request: Request, response: Response) {
    const room_id = request.params.id;

    const room_messages = await ListRoomMessagesService.execute(room_id);

    return response.json(room_messages);
  }
}
export default new ListRoomMessagesController();
