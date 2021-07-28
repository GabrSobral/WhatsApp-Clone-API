import { Request, Response } from "express";
import ListMessagesService from "../../services/Messages/ListMessagesService";

class ListMessagesController{
  async handle(request: Request, response: Response){
    const messages = await ListMessagesService.execute()

    return response.json(messages)
  }
}
export default new ListMessagesController()