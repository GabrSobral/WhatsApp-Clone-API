import { Messages } from "../../models/Message"

class ListRoomMessagesService {
  async execute(room_id: string){
    const room = await Messages.find({ assignedTo: room_id }).sort('-timestamp').limit(10)

    if(!room){
      throw new Error('Room not found status:400')
    }
    return room.reverse()
  }
}
export default new ListRoomMessagesService()