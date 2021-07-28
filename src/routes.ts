import express from 'express'

import checkAuth from './middlewares/checkAuth'

import CreateUserController from './controllers/Users/CreateUserController'
import ShowUserController from './controllers/Users/ShowUserController'
import AuthenticateController from './controllers/Users/AuthenticateController'
import DeleteUserController from './controllers/Users/DeleteUserController'
import LogoutUserController from './controllers/Users/LogoutUserController'
import ListUsersController from './controllers/Users/ListUsersController'

import CreateMessageController from './controllers/Messages/CreateMessageController'
import ListMessagesController from './controllers/Messages/ListMessagesController'
import DeleteMessagesController from './controllers/Messages/DeleteMessagesController'

const router = express.Router()

router.post('/messages/new',[checkAuth], CreateMessageController.handle)
router.get('/messages/sync',[checkAuth], ListMessagesController.handle)
router.delete('/messages/delete/:id', [checkAuth], DeleteMessagesController.handle)

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
