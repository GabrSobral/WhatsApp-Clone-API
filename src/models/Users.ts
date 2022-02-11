import { Schema, Document, model } from "mongoose";
import { Room } from './Room'

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  isOnline: boolean;
  lastOnline: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  isOnline: {
    type: Boolean,
    required: true,
    default: true,
  },
  lastOnline: {
    type: Date,
    required: true,
    default: Date.now,
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