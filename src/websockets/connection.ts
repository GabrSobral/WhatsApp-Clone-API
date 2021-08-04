import { io } from "../http"
import { Socket } from 'socket.io'
import { UnreadMessages } from "../models/UnreadMessages"

io.on('connection', (socket: Socket) => {
  
  console.log('A new user has been connected: ', socket.id)

  socket.on('joinroom', ({rooms}) => {
    rooms.forEach((item: string) => {
      console.log(item)
     socket.join(item)
    })

  })
  socket.on('leaveRoom', (room) => {
    socket.leave(room)
  })
  socket.on('viewUnreadMessages', async({ user, room }) => {
    console.log(user, room, "banana")
    await UnreadMessages.deleteMany({ to: room, user: { $nin:user } })
  })

  socket.on('disconnect', () =>{
    console.log('A user has been disconnected')
  })

  socket.on('sendMessage', async ({messageData, room}) => {
    const unreadMessages = await UnreadMessages.create({
      user: messageData.user,
      message: messageData,
      to: messageData.assignedTo
    })
    io.to(room).emit('newMessage', {messageData, unreadMessages})
  })
})