import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: String,
    },
    user  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now,
        required : true
    },
    received : {
        type: Boolean,
        default: false
    }
})

const Messages = mongoose.model("messages", MessageSchema);

export default Messages