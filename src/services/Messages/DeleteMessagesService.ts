import { Messages } from "../../models/Message"

class DeleteMessagesService {
  async execute(message_id: string){
    await Messages.findByIdAndDelete(message_id)

    return
  }
}
export default new DeleteMessagesService()