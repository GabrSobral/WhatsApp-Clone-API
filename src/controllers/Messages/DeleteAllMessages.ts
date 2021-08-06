import { Request, Response } from "express";
import { Messages } from "../../models/Message";

class DeleteAllMessages {
  async handle(request: Request, response: Response) {
    await Messages.deleteMany({})

    return response.sendStatus(200)
  }
}
export default new DeleteAllMessages()