import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
    },
    email : {
        type: String,
        unique: true,
        required : true,
        lowercase : true
    },
    isOnline : {
        type : Boolean,
        required : true,
        default : false
    },
    lastOnline : {
        type : Date,
        required : true,
        default  : Date.now
    },
    password : {
        type: String,
        required : true,
        length : 65,
        select: false
    },
    createdAt : {
        type : Date,
        required : true,
        default  : Date.now
    }
})
UserSchema.pre('save', async function( next ) { 
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})


const User = mongoose.model('users', UserSchema)

export default User