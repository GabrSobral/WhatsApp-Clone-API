import express from 'express'
import MessageController from './controllers/MessageController.js'
import RoomController from './controllers/RoomController.js'

import checkAuth from './middlewares/checkAuth.js'
import CreateUserController from './controllers/Users/CreateUserController.js'
import ShowUserController from './controllers/Users/ShowUserController.js'
import AuthenticateController from './controllers/Users/AuthenticateController.js'
import DeleteUserController from './controllers/Users/DeleteUserController.js'
import LogoutUserController from './controllers/Users/LogoutUserController.js'
import ListUsersController from './controllers/Users/ListUsersController.js'

const router = express.Router()

router.post('/messages/new',[checkAuth], MessageController.CreateMessage)
router.get('/messages/sync',[checkAuth], MessageController.ListMessages)
router.delete('/messages/delete/:id', [checkAuth], MessageController.DeleteMessages)

router.post('/register', CreateUserController.handle)
router.post('/authenticate', AuthenticateController.handle)
router.get('/users', [checkAuth], ListUsersController.handle)
router.get('/users/:id', [checkAuth], ShowUserController.handle)
router.delete('/users/:id', [checkAuth], DeleteUserController.handle)
router.patch('/users/logout', [checkAuth], LogoutUserController.handle)

router.post('/room', [checkAuth] , RoomController.CreateRoom)
router.get('/room', [checkAuth], RoomController.ListRooms)
router.get('/room/:id', [checkAuth], RoomController.ShowRoom)
router.get('/room/messages/:id', [checkAuth], RoomController.ListRoomMessages)
router.delete('/room/:id', [checkAuth], RoomController.DeleteRoom)

export default router
