import express from 'express'
import multer from 'multer'

import checkAuth from './middlewares/checkAuth'
import { upload } from './config/multer'

import CreateUserController from './controllers/Users/CreateUserController'
import ShowUserController from './controllers/Users/ShowUserController'
import AuthenticateController from './controllers/Users/AuthenticateController'
import DeleteUserController from './controllers/Users/DeleteUserController'
import LogoutUserController from './controllers/Users/LogoutUserController'
import ListUsersController from './controllers/Users/ListUsersController'

import ListMessagesController from './controllers/Messages/ListMessagesController'
import DeleteMessagesController from './controllers/Messages/DeleteMessagesController'

import CreateRoomController from './controllers/Room/CreateRoomController'
import ListRoomsController from './controllers/Room/ListRoomsController'
import ShowRoomController from './controllers/Room/ShowRoomController'
import ListRoomMessagesController from './controllers/Room/ListRoomMessagesController'
import DeleteRoomController from './controllers/Room/DeleteRoomController'
import DeleteAllMessages from './controllers/Messages/DeleteAllMessages'

import ListMyStatusController from './controllers/Status/ListMyStatusController'
import CreateStatusController from './controllers/Status/CreateStatusController'
import ListStatusToMeController from './controllers/Status/ListStatusToMeController'

const router = express.Router()

router.get('/messages/list', checkAuth, ListMessagesController.handle)
router.delete('/messages/delete/:id', checkAuth, DeleteMessagesController.handle)
router.delete('/messages/delete-all', checkAuth, DeleteAllMessages.handle)

router.post('/users/register', CreateUserController.handle)
router.post('/users/authenticate', AuthenticateController.handle)
router.get('/users/list', ListUsersController.handle)
router.post('/users/show', checkAuth, ShowUserController.handle)
router.delete('/users/delete/:id', checkAuth, DeleteUserController.handle)
router.patch('/users/logout', checkAuth, LogoutUserController.handle)

router.post('/room/new/:id', checkAuth , CreateRoomController.handle)
router.get('/room/list', checkAuth, ListRoomsController.handle)
router.get('/room/:id', checkAuth, ShowRoomController.handle)
router.get('/room/messages/list/:id', checkAuth, ListRoomMessagesController.handle)
router.delete('/room/delete/:id', checkAuth, DeleteRoomController.handle)

router.post('/status/create', checkAuth, upload, CreateStatusController.handle)
router.get('/status/my-list', checkAuth, ListMyStatusController.handle)
router.get('/status/list', checkAuth, ListStatusToMeController.handle)

export default router
