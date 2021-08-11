import { Room } from "../../models/Room"

class ShowRoomService{
  async execute(room_id: string){
    const room = await Room.findById(room_id).populate(['users', 'messages'])

    return room
  }
}
export default new ShowRoomService()