import { Room } from "../../models/Room"
import { UnreadMessages } from "../../models/UnreadMessages"
import { IUser } from "../../models/Users"
import { IMessage, Messages } from "../../models/Message"

export interface IFormattedRooms {
  _id: string;
  messages: IMessage[];
  user: IUser[];
  unreadMessages: number;
}

class ListRoomsService{
  async execute(user_id: string){
    const rooms = await Room.find({users: {$in:user_id}}, ["_id", "users"])
    .populate('users');

    
    const formattedRooms: IFormattedRooms[] =  await Promise.all(
      rooms.map(async (room) => {
        const unreadMessages = await UnreadMessages.countDocuments(
          { to: room._id, user: { $nin:user_id } });
          
        const messages = await Messages
          .findOne({ assignedTo: room._id }, ["_id", "message", "user", "timestamp"])
          .sort({timestamp: -1})
          .populate(["referencedTo"]);

        return {
          _id: room._id,
          messages: [messages],
          user: room.users.filter((user: IUser) => String(user._id) !== String(user_id)),
          unreadMessages
        };
      })
    )

    return formattedRooms
  }
}
export default new ListRoomsService()