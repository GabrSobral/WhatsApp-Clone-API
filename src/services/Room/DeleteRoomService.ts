import { IMessage, Messages } from "../../models/Message"
import { Room } from "../../models/Room"

class DeleteRoomService {
  async execute(room_id: string){
    const messagesRoom = await Room.findById(room_id) 
      await Room.findByIdAndRemove(room_id)

      messagesRoom.messages.map( async (message: IMessage) => {
        await Messages.findByIdAndDelete(message._id)
      })
    
  }
}
export default new DeleteRoomService()