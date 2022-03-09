import express from 'express'

import checkAuth from './middlewares/checkAuth'

import { UserController } from './controllers/UserController'

const router = express.Router()

const userController = new UserController();

router.post('/users/authenticate', userController.SignIn);
router.get('/users/list', userController.List);
router.post('/users/show', checkAuth, userController.Show);
router.delete('/users/delete/:id', checkAuth, userController.Delete);
router.patch('/users/logout', checkAuth, userController.LogOut);

export default router
