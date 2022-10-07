const socket = io('http://localhost:3000')
const userdetail = document.getElementById('rooms')
const roomid = document.getElementById('room-id')
const names = document.getElementById('name')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainers = document.getElementById('message-containers')
const messageForms = document.getElementById('send-containers')
const messageInputs = document.getElementById('message-inputs')
let room = ""


//Joining any group or connecting to the server
userdetail.addEventListener('submit', e => {
    e.preventDefault()

    room = roomid.value
    const name = names.value

    socket.emit('new-user', room, name)
})



socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})


/* --------------------------------------------- FRONTEND MESSAGES TO THE USER ------------------------------------------*/
// General Public Connection message to the frontend 
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('public-room', room => {
    appendMessage(`You joined the public chat group `)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

// Private connection message to the user
socket.on('room-joined', name => {
    appendMessage(`${name} connected`)
})

socket.on('private-room', room => {
    appendMessage(`You joined the private chat for room:  ${room} `)
})

socket.on('unsuccessfull-msg', name => {
    appendMessage(`Sorry ${name}, Room is full! Please try with another room Id`)
})




/* --------------------------------- Adding event listener to send text messages ---------------------------------------------*/
// Public Event Listener
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message, room)
    messageInput.value = ''
})

// Private Event Listener
messageForms.addEventListener('submit', e => {
    e.preventDefault()
    const messages = messageInputs.value
    appendMessage(`You: ${messages}`)
    socket.emit('send-chat-message', messages, room)
    messageInputs.value = ''
})


/* --------------------------------- Function to write the message to other users ---------------------------------------------*/
// Public chat
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

// Private Chats
function appendMessages(messages) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}