import { Messages } from "../../models/Message"

class ListRoomMessagesService {
  async execute(room_id: string, last_message: string){
    let room = []

    !last_message ?
      room = await Messages.find({ assignedTo: room_id })
      .sort({ _id: -1 }).limit(10)
    :
      room = await Messages.find({ _id: { $lt: last_message}, assignedTo: room_id })
      .sort({ _id: -1 }).limit(10)

    if(!room){
      throw new Error('Room not found status:400')
    }
    return room.reverse()
  }
}
export default new ListRoomMessagesService()