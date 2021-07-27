import { Schema, model, Document } from "mongoose";

interface Message extends Document {
  message: string;
  user: string;
  assignedTo: string;
  timestamp: Date;
  reveived: boolean;
}

const MessageSchema = new Schema<Message>({
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

const Messages = model("messages", MessageSchema);

export default Messages;
