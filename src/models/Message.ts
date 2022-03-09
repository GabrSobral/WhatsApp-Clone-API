import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  _id: string;
  key_remote_jid: string;
  key_id: string;
  timestamp: Date;
  needs_push: boolean;
  recipient_count: number;
  remote_resource: string;
  media_wa_type: "text" | "image" | "audio" | "video" | "geo-position";
  latitude: number;
  longitude: number;
  data: string;
  raw_data: string;
}

const MessageSchema = new Schema<IMessage>({
  key_remote_jid: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
  referencedTo: {
    type: Schema.Types.ObjectId,
    ref: "messages",
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  received: {
    type: Boolean,
    default: true,
  },
  viewed: {
    type: Boolean,
    default: false,
  }
});

const Messages = model<IMessage>("messages", MessageSchema);

export { Messages };
