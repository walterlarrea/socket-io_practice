const socket = io()

document.addEventListener("DOMContentLoaded", () => {
  const createRoomButton = document.getElementById('create-room')
  const joinRoomForm = document.getElementById('join-room-form')
  const joinRoomInput = document.getElementById('join-input')

  joinRoomForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const roomId = joinRoomInput.value

    if (roomId) {
      socket.emit('join room', roomId)
      window.location = `/room.html?id=${roomId}`
    }
  })

  createRoomButton.addEventListener('click', (e) => {
    socket.emit('create room', 'new')
  })

  socket.on('create room', (roomId) => {
    window.location = `/room.html?id=${roomId}`
  })
})