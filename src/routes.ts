import express from 'express'
import MessageController from './controllers/MessageController.js'
import userController from './controllers/userController.js'
import RoomController from './controllers/RoomController.js'

import checkAuth from './middlewares/checkAuth.js'

const router = express.Router()

router.post('/messages/new',[checkAuth], MessageController.CreateMessage)
router.get('/messages/sync',[checkAuth], MessageController.ListMessages)
router.delete('/messages/delete/:id', [checkAuth], MessageController.DeleteMessages)

router.post('/register', userController.CreateUser)
router.get('/users', [checkAuth], userController.ListUsers)
router.get('/users/:id', [checkAuth], userController.showUser)
router.post('/authenticate', userController.Authenticate)
router.delete('/users/:id', [checkAuth], userController.DeleteUser)
router.patch('/users/logout', [checkAuth], userController.LogoutUser)

router.post('/room', [checkAuth] , RoomController.CreateRoom)
router.get('/room', [checkAuth], RoomController.ListRooms)
router.get('/room/:id', [checkAuth], RoomController.ShowRoom)
router.get('/room/messages/:id', [checkAuth], RoomController.ListRoomMessages)
router.delete('/room/:id', [checkAuth], RoomController.DeleteRoom)

export default router
