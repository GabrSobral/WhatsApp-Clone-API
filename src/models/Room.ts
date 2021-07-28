import { Schema, Document, model } from "mongoose";
import { Message } from "./Message";
import { User } from "./Users";

export interface Room extends Document {
  name: string;
  messages: Message['_id'];
  users: User['_id'];
}

const RoomSchema = new Schema<Room>({
  name: {
    type: String,
    required: true,
  },
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
});

const Room = model("rooms", RoomSchema);

export { Room };
