const socket = io()
const searchParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById('chat-form')
  const chatInput = document.getElementById('chat-textbox')
  const messages = document.getElementById('messages')
  const roomIdToShare = document.getElementById('room-id')

  const ROOM_ID = searchParams.get('id') // param or null if not exists

  if (!ROOM_ID) document.location = ('/')

  roomIdToShare.innerHTML = ROOM_ID
  socket.emit('join room', ROOM_ID)

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (chatInput.value) {
      socket.emit('chat message', {
        msg: chatInput.value,
        room: ROOM_ID,
      })
      chatInput.value = ''
    }
  })

  socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
  })
})