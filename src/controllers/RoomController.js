import express from 'express'
import { Room } from '../models/Room'
import { Messages } from '../models/Message'

export default {
    async CreateRoom( req, res ){
        const data = req.body

        try{
            const roomId = await Room.findOne({ users : [ req.userId, data.user ] }) ||
            await Room.findOne({ users : [ data.user, req.userId ] })

            if(roomId) {
                return res.status(200).send({ error : "Room already exists", _id: roomId._id  })
            }
            
            const room = await Room.create({...data, users : [ req.userId, data.user ]})
            return res.send(room)

        } catch(error){
            return res.status(400).send({error})
        }
     
    },
    async ListRooms( req, res ){
        try{
            const rooms = await Room.find().populate(['users', 'messages'])

            return res.send(rooms)
        } catch(err){
            return res.status(400).send({ error : err })
        }
        
    },
    async ShowRoom( req, res ){
        const id = req.params.id
        const rooms = await Room.findById(id).populate(['users', 'messages'])

        return res.send(rooms)
    },
    async ListRoomMessages( req, res ){

        try{
            const id = req.params.id

            const room = await Room.findById(id).populate(['messages', 'users'])
    
            if(!room) return res.status(401).send({ error : "Room not found" })
    
            return res.send(room.messages)
        } catch(err) {
            return res.status(400).send()
        }
        
    },
    async DeleteRoom( req, res ){
        const messagesRoom = await Room.findById(req.params.id) 
        await Room.findByIdAndRemove(req.params.id)

            console.log(messagesRoom)
        // messagesRoom.messages.map( async message => {
        //     await Messages.findByIdAndDelete(message._id)
        // })
    

        return res.send({ success : "Success on delete room" })
    }
}