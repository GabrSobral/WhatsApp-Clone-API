import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    messages :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }],
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
    }]
})

const Room = mongoose.model('rooms', RoomSchema);

export default Room