import express from 'express'
import Messages from '../models/messageContent.js'
import Room from '../models/room.js'

export default {
    async CreateMessage( req, res ){
        const { message, assignedTo } = req.body
        const messages = await Messages.create({ message, assignedTo, user: req.userId })

        const room = await Room.findById(assignedTo) 
        await room.messages.push(messages)   

        await room.save()

        return res.send({ messages })
    },
    async ListMessages(req, res) {
        const messages = await Messages.find().populate('users')
        return res.send(messages)
    },
    async DeleteMessages( req, res ){
        const id = req.params.id

        try {
            await Messages.findByIdAndDelete(id)
            return res.send({ success : "Your message was deleted" })
        } catch (err){
            return res.status(400).send({error : "Error on delete message"});
        }
    }
}