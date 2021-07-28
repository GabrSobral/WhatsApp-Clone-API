import express from 'express'
// import MessageController from './controllers/MessageController.js'
// import RoomController from './controllers/RoomController.js'

import checkAuth from './middlewares/checkAuth'
import CreateUserController from './controllers/Users/CreateUserController'
import ShowUserController from './controllers/Users/ShowUserController'
import AuthenticateController from './controllers/Users/AuthenticateController'
import DeleteUserController from './controllers/Users/DeleteUserController'
import LogoutUserController from './controllers/Users/LogoutUserController'
import ListUsersController from './controllers/Users/ListUsersController'

const router = express.Router()

// router.post('/messages/new',[checkAuth], MessageController.CreateMessage)
// router.get('/messages/sync',[checkAuth], MessageController.ListMessages)
// router.delete('/messages/delete/:id', [checkAuth], MessageController.DeleteMessages)

router.post('/users/register', CreateUserController.handle)
router.post('/users/authenticate', AuthenticateController.handle)
router.get('/users/list', [checkAuth], ListUsersController.handle)
router.get('/users/show/:id', [checkAuth], ShowUserController.handle)
router.delete('/users/delete/:id', [checkAuth], DeleteUserController.handle)
router.patch('/users/logout', [checkAuth], LogoutUserController.handle)

// router.post('/room', [checkAuth] , RoomController.CreateRoom)
// router.get('/room', [checkAuth], RoomController.ListRooms)
// router.get('/room/:id', [checkAuth], RoomController.ShowRoom)
// router.get('/room/messages/:id', [checkAuth], RoomController.ListRoomMessages)
// router.delete('/room/:id', [checkAuth], RoomController.DeleteRoom)

export default router
