import { Schema, Document, model } from "mongoose";

interface Room extends Document {
  name: string;
  messages: string[];
  users: string[];
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

export default Room;
