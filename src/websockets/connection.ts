import { io } from "../http"
import { Socket } from 'socket.io'

io.on('connection', (socket: Socket) => {
  
  console.log('A new user has been connected: ', socket.id)

  socket.on('joinroom', ({rooms}) => {
    rooms.forEach(item => {
      console.log(item)
     socket.join(item)
    })

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