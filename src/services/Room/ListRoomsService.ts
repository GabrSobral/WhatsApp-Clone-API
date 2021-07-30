import { Room } from "../../models/Room"
import { IUser } from "../../models/Users"

class ListRoomsService{
  async execute(user_id: string){
    const rooms = 
      await Room.find({ users: {$in:user_id} })
      .populate(['users', 'messages'])

    const formattedRooms= []

    rooms.forEach(room => {
      formattedRooms.push({
        _id: room._id,
        messages: room.messages,
        user: room.users.filter((user: IUser) => String(user._id) !== String(user_id))
      })
    })

    return formattedRooms
  }
}
export default new ListRoomsService()