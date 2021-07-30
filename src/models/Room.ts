import { Schema, Document, model } from "mongoose";
import { IMessage } from "./Message";
import { IUser } from "./Users";

export interface IRoom extends Document {
  name: string;
  messages: IMessage["_id"];
  users: IUser["_id"];
}

const RoomSchema = new Schema<IRoom>({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "messages",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  unreadMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  ],
});

const Room = model<IRoom>("rooms", RoomSchema);

export { Room };
