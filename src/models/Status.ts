import { Schema, Document, model } from 'mongoose'
import { IUser } from './Users'

export interface IStatusSchema extends Document {
  file?: String;
  message?: String;
  validity: Date;
  owner: IUser["_id"];
  viewedBy: IUser["_id"][]
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
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  viewedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  color: {
    type: String,
    default: "#dd00dd"
  }
})

const Status = model<IStatusSchema>('status', StatusSchema)

export { Status }