import { Request, Response } from "express";
import CreateRoomService from "../../services/Room/CreateRoomService";

class CreateRoomController {
  async handle(request: Request, response: Response) {
    const user = request.params.id;
    const user_id = request.user_id;

    const room = await CreateRoomService.execute({
      user,
      user_id,
    });

    return response.json(room);
  }
}
export default new CreateRoomController();
