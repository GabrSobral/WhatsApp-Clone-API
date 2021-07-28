import { Request, Response } from "express";
import DeleteMessagesService from "../../services/Messages/DeleteMessagesService";

class DeleteMessagesController {
  async handle(request: Request, response: Response) {
    const message_id = request.params.id

    await DeleteMessagesService.execute(message_id)

    return response.sendStatus(200)
  }
}
export default new DeleteMessagesController()