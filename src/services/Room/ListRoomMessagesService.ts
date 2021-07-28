import { Room } from "../../models/Room"

class ListRoomMessagesService {
  async execute(room_id: string){
    const room = await Room.findById(room_id).populate(['messages', 'users'])
    
    if(!room){
      throw new Error('Room not found status:400')
    }

    return room
  }
}
export default new ListRoomMessagesService()