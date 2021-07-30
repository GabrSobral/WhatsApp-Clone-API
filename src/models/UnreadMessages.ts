import { Schema, Document, model } from "mongoose";
import { IMessage } from "./Message";
import { IRoom } from "./Room";
import { IUser } from "./Users";

export interface IUnreadMessages extends Document{
  user: IUser['_id'];
  messsage: IMessage['_id'];
  to: IRoom['_id']
}

const UnreadMessagesSchema = new Schema<IUnreadMessages>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'messages',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'rooms',
    required: true,
  }
})

const UnreadMessages = model('unreadMessages', UnreadMessagesSchema)

export { UnreadMessages }
