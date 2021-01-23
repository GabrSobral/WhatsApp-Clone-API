import 'dotenv/config.js'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes.js'
import cors from 'cors'
import http from 'http'
import mongoose from 'mongoose'
import * as socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server);

io.on('connection', (socket) => {
  
  console.log('A new user has been connected: ', socket.id)

  socket.on('joinroom', (room) => {
    socket.join(room)

  })
  socket.on('leaveRoom', (room) => {
    socket.leave(room)
  })

  socket.on('disconnect', () =>{
    console.log('A user has been disconnected')
  })

  socket.on('sendMessage', ({messageData, room})=>{
    io.to(room).emit('newMessage', {messageData})
  })
 
})

// APP USE
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(cors());

// DATABASE MONGO
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

// ROUTES
app.use(routes)
// LISTENING PORT
const PORT = process.env.PORT || 3001
server.listen(PORT, () => { console.log("Server Running on port " + PORT)})
