import { Request, Response } from "express";
import CreateMessageService from "../../services/Messages/CreateMessageService";

class CreateMessageController{
  async handle(request: Request, response: Response){
    const { message, assignedTo } = request.body
    const user_id = request.user_id

    const newMessage = await CreateMessageService.execute({
      message, assignedTo, user_id
    })

    return response.json(newMessage)
  }
}
export default new CreateMessageController()