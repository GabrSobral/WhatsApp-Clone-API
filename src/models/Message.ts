import { Schema, model, Document } from "mongoose";
import { IUser } from "./Users";

export interface IMessage extends Document {
  message: string;
  user: IUser['_id'];
  assignedTo: IUser['_id'];
  timestamp: Date;
  reveived: boolean;
}

const MessageSchema = new Schema<IMessage>({
  message: {
    type: String,
    required: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  received: {
    type: Boolean,
    default: false,
  },
});

const Messages = model<IMessage>("messages", MessageSchema);

export { Messages };
