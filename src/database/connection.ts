import mongoose from 'mongoose'
import { io } from '../http'

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex : true, 
  useFindAndModify : false })

mongoose.connection.once('open', () => { 
  console.log("Connection successful") 

  const changeStreamUsers = mongoose.connection.collection('users').watch()
  changeStreamUsers.on('change', (change)=>{
     switch(change.operationType) {
       case 'insert' : 
       const user = {
         _id : change.fullDocument._id,
         name : change.fullDocument.name,
         email : change.fullDocument.email,
         isOnline : change.fullDocument.isOnline,
         lastOnline : change.fullDocument.lastOnline,
       }
       console.log(user)
       io.emit('newUser', user)
       break;

       case 'delete' : 
       io.emit('deleteUser', change.documentKey._id)
       break;
       
       case 'update' :
        console.log(change.updateDescription.updatedFields)
        io.emit('updateUser', change.updateDescription.updatedFields.isOnline, change.documentKey._id)
       break
     }
  })

}).on('error', (err)=>{
  console.log('error', err)
})