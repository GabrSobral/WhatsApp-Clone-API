import { Schema, Document, model } from "mongoose";
import { Room } from './Room'

export interface IUser extends Document {
  id: string;
  jid: string;
  bio: string;
  number: string;
  wa_name: string,
  photo: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  wa_name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false
  },
  jid: {
    type: String,
    required: true
  },
  number: {
    type: String,
    unique: true,
    required: true
  },
  photo: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

UserSchema.pre("remove", function(next) {
  Room.remove({ user: { $nin: this._id } });
  next();
});

const User = model<IUser>("users", UserSchema);

export { User };