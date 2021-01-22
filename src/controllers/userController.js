import express from 'express'
import User from '../models/users.js'
import Room from '../models/room.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import jwtSecret from '../config/auth.js'

export default {

    async ListUsers(req, res){
        try{
            const users = await User.find()
            return res.send( users )
        } catch(err){
            return res.status(500).send(err)
        }
    },
    async showUser( req, res ){
        const id = req.params.id

        const user = await User.findById(id)

        if(!user) return res.status(401).send({ error : "User not found" })

        return res.status(200).send(user)
    },

    async CreateUser( req, res ) {
        const { email } = req.body

        try{
            if(await User.findOne({ email })){
                return  res.status(400).send({error : 'User already exists'})
            }

            const user = await User.create( req.body )

            user.isOnline = true
            await user.save()
            user.password = undefined

            const token = jwt.sign({ id : user.id }, jwtSecret.secret , { expiresIn : 86400 })

            return res.send({user, token})
        } catch (err){
            return res.status(400).send({error : "Registration failed", message : err})
        }
    },

    async Authenticate( req, res ) {
        let { email, password } = req.body

        const user = await  User.findOne({ email }).select('+password')  
        
        if(!user){
            return res.status(400).send({error : 'User not found'})
        }

        // if(!await bcrypt.compare(password, user.password)){
        //     return res.status(400).send({ error  : "Invalid Password" })
        // }

        const hash = await bcrypt.hash(password, 10)
        password = hash
              
        user.isOnline = true
        await user.save()
        user.password = undefined
        
        const token = jwt.sign({ id : user.id }, jwtSecret.secret , { expiresIn : 86400 })
        return res.send({ user, token })
    },
    async DeleteUser( req, res ){
        const id = req.params.id

        try {
            await User.findByIdAndDelete(id)
            console.log(room)
            return res.send({ success : "User was deleted" })
        } catch (err){
            return res.status(400).send({error : "Error on delete user"})
        }
    },
    async LogoutUser( req, res) {

        const user = await User.findByIdAndUpdate(req.userId, { isOnline : false, lastOnline : Date.now()})

        return res.send(user);
    }
}