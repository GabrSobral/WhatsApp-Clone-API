import { Schema, Document, model } from 'mongoose'
import { IUser } from './Users'

export interface IStatusSchema extends Document {
  file?: String;
  message?: String;
  validity: Date;
  owner: IUser["_id"];
  viewedBy: IUser["_id"][];
  color: String;
  destinedTo: IUser["_id"];
  createdAt: Date;
}

const StatusSchema = new Schema<IStatusSchema>({
  file: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  },
  validity: {
    type: Date,
    required: true,
    default: new Date(+new Date() + 1*24*60*60*1000) // 1 day of validity
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  viewedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  color: {
    type: String,
    default: "#dd00dd"
  },
  destinedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Status = model<IStatusSchema>('status', StatusSchema)

export { Status }