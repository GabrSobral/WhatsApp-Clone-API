import 'dotenv/config.js'
import express from 'express'
import routes from './routes.js'
import cors from 'cors'
import http from 'http'
import * as socketio from 'socket.io'
import { ErrorCatcher } from './middlewares/ErrorCatcher.js'

const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server);

app.use(express.json());
app.use(cors());
app.use(ErrorCatcher)
app.use(routes)

export { io, server }