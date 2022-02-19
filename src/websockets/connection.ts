import { io } from "../http"
import { Socket } from 'socket.io'
import { UnreadMessages } from "../models/UnreadMessages"

import { Messages } from "../models/Message"
import { User } from "../models/Users"
import { Room } from "../models/Room"

import CreateMessageService from "../services/Messages/CreateMessageService"
import ListRoomsService from "../services/Room/ListRoomsService"
import LogoutUserService from "../services/User/LogoutUserService"

io.on('connection', (socket: Socket) => {
  console.log('A new user has been connected: ', socket.id);

  socket.on('fetch_rooms', async ({ user_id }) => {
    const rooms = await ListRoomsService.execute(user_id);
    
    socket.join(user_id);
    rooms.forEach(item => socket.join(item._id.toString()));
    socket.emit("receive_fetch_rooms", { rooms });
  });

  socket.on('joinNewRoom', async ({user_target, user, check, room_id}) =>{
    socket.join(user_target); 

    if(!check) {
      const updatedRoom = await Room
        .findById(room_id)
        .populate(['users', "messages"]);

      const user_data = await User.findById(user);

      const formattedRoom = {
        _id: updatedRoom._id,
        messages: updatedRoom.messages,
        user: [user_data],
        unreadMessages: 0
      }
      socket.to(room_id).emit('receiveJoinNewRoom', {
        user,
        room: formattedRoom
      });
    }
  });

  socket.on('removeRoom', ({ user_target, user, room, check }) => {
    if(!check){
      socket.to(user_target).emit('receiveRemoveRoom', { user, room })
      socket.leave(user_target)
    } else
      socket.leave(user_target)
  });

  socket.on('viewUnreadMessages', ({ user, room }) => {
    UnreadMessages.deleteMany({ to: room, user: { $nin:user } })
    Messages.updateMany({
      viewed: false,
      user: { $nin:user },
      to: room
    }, {"$set":{ "viewed": true }});

    socket.to(room).emit('receiveReadMessages', { room, user })
  });

  socket.on('writting', ({ to, writting, room }) => {
    socket.to(to).emit('receiveWritting', { writting, room, to });
  });

  socket.on('imOnline', ({ user, status, rooms }) => {
    User.findByIdAndUpdate(user, { isOnline: !!status, lastOnline: new Date });

    rooms && rooms.forEach((item: string) => {
      socket.to(item).emit('receiveImOnline', { user, status, room: item })
    });
  });

  socket.on('disconnecting', () => {
    console.log('A user has been disconnected', socket.rooms)
    LogoutUserService.execute(socket.rooms[1]);

    socket.rooms.forEach((item) => {
      socket.to(item).emit('receiveImOnline', { status: false, room: item })
    })
  });

  socket.on('sendMessage', async ({ message }) => {
    const messateText = message.message;
    const assignedTo = message.assignedTo;
    const user_id = message.user;
    const referencedTo = message.referencedTo ? message.referencedTo._id: null;

    const newMessage = await CreateMessageService
      .execute({ 
        message: messateText, 
        assignedTo, 
        user_id,
        referencedTo
      });

    const unreadMessages = await UnreadMessages.create({
      user: user_id,
      message: newMessage,
      to: assignedTo
    });

    message._id = newMessage._id;
    io.to(assignedTo).emit('newMessage', { message, unreadMessages });
  });
});