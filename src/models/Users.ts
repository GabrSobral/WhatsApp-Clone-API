import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface User extends Document{
  name: string;
  email: string;
  isOnline: boolean;
  lastOnline: boolean;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
    default: false,
  },
  lastOnline: {
    type: Date,
    required: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
    length: 65,
    select: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = model("users", UserSchema);

export { User };
