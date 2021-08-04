import { Room } from "../../models/Room"
import { UnreadMessages } from "../../models/UnreadMessages"
import { IUser } from "../../models/Users"

class ListRoomsService{
  async execute(user_id: string){
    const rooms = 
      await Room.find(
        { users: {$in:user_id} }, { messages: {$slice: -1} }
      ).populate(['users', 'messages'])
      
      const formattedRooms =  await Promise.all(
        rooms.map(async (room) => {
          const unreadMessages = await UnreadMessages.countDocuments(
            { to: room._id, user: { $nin:user_id } }
          )

          return({
            _id: room._id,
            messages: room.messages,
            user: room.users.filter((user: IUser) => String(user._id) !== String(user_id)),
            unreadMessages
          })
        })
      )

    return formattedRooms
  }
}
export default new ListRoomsService()