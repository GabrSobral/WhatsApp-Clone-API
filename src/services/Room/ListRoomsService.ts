import { Room } from "../../models/Room"
import { IUnreadMessages, UnreadMessages } from "../../models/UnreadMessages"
import { IUser } from "../../models/Users"
import { IMessage } from "../../models/Message"

export interface IFormattedRooms {
  _id: string;
  messages: IMessage[];
  user: IUser[];
  unreadMessages: number;
}

class ListRoomsService{
  async execute(user_id: string){
    const rooms = await Room.find({ 
      users: {$in:user_id} 
    }, { 
      messages: {$slice: -1} 
    }).populate(['users', 'messages'])
      
      const formattedRooms: IFormattedRooms[] =  await Promise.all(
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