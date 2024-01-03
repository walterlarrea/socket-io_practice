import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(join(__dirname, 'public')))

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('create room', (data) => {
    const newRoomId = uuidv4()
    console.log('New room with ID: ' + newRoomId)
    socket.emit('create room', newRoomId)
  })

  socket.on('join room', (room) => {
    console.log('User joined a room with ID: ' + room)
    socket.join(room)
  })

  socket.on('chat message', (msgObj) => {
    io.to(msgObj.room).emit('chat message', msgObj.msg)
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})