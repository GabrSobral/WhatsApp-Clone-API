import { Room } from "../../models/Room"

class ListRoomsService{
  async execute(){
    const rooms = await Room.find().populate(['users', 'messages'])

    return rooms
  }
}
export default new ListRoomsService()