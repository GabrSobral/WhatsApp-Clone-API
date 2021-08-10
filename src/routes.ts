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

import CreateRoomController from './controllers/Room/CreateRoomController'
import ListRoomsController from './controllers/Room/ListRoomsController'
import ShowRoomController from './controllers/Room/ShowRoomController'
import ListRoomMessagesController from './controllers/Room/ListRoomMessagesController'
import DeleteRoomController from './controllers/Room/DeleteRoomController'
import DeleteAllMessages from './controllers/Messages/DeleteAllMessages'

const router = express.Router()

router.post('/messages/new', checkAuth, CreateMessageController.handle)
router.get('/messages/list', checkAuth, ListMessagesController.handle)
router.delete('/messages/delete/:id', checkAuth, DeleteMessagesController.handle)
router.delete('/messages/delete-all', checkAuth, DeleteAllMessages.handle)

router.post('/users/register', CreateUserController.handle)
router.post('/users/authenticate', AuthenticateController.handle)
router.get('/users/list', checkAuth, ListUsersController.handle)
router.get('/users/show', checkAuth, ShowUserController.handle)
router.delete('/users/delete/:id', checkAuth, DeleteUserController.handle)
router.patch('/users/logout', checkAuth, LogoutUserController.handle)

router.post('/room/new/:id', checkAuth , CreateRoomController.handle)
router.get('/room/list', checkAuth, ListRoomsController.handle)
router.get('/room/:id', checkAuth, ShowRoomController.handle)
router.get('/room/messages/list/:id', checkAuth, ListRoomMessagesController.handle)
router.delete('/room/delete/:id', checkAuth, DeleteRoomController.handle)

export default router
