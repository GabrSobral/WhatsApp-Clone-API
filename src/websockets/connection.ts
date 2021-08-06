import { io } from "../http"
import { Socket } from 'socket.io'
import { UnreadMessages } from "../models/UnreadMessages"
import { Messages } from "../models/Message"

io.on('connection', (socket: Socket) => {
  console.log('A new user has been connected: ', socket.id)

  socket.on('joinroom', ({rooms}) => {
    rooms.forEach((item: string) => {
     socket.join(item)
    })
  })

  socket.on('leaveRoom', (room) => {
    socket.leave(room)
  })

  socket.on('viewUnreadMessages', async({ user, room }) => {
    await UnreadMessages.deleteMany({ to: room, user: { $nin:user } })
    await Messages.updateMany(
      { viewed: false }, {"$set":{"viewed": true}})

    io.to(user).emit('receiveReadMessages', { room })
  })

  socket.on('writting', ({ to, writting, room }) => {
    io.to(to).emit('receiveWritting', { writting, room, to })
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