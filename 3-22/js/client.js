const messageTextBox = document.getElementById('messageTextBox')
const usernameTextBox = document.getElementById('usernameTextBox')
const sendButton = document.getElementById('sendButton')
const messagesUL = document.getElementById("messagesUL")

sendButton.addEventListener('click', () => {
    const username = usernameTextBox.value 
    const chatMessage = messageTextBox.value 
    socket.emit('General', { username: username, message: chatMessage })
})

socket.on('General-Joined', chatMessages => {
    const chatMessagesItems = chatMessages.map(chatMessage => {
        return  `<li>${chatMessage.username}: ${chatMessage.message}</li>`
    })

    messagesUL.innerHTML = chatMessagesItems.join('')
})

socket.on('General', (chat) => {
    const chatMessageLI = `<li>${chat.username}: ${chat.message}</li>`
    messagesUL.insertAdjacentHTML('beforeend', chatMessageLI)
})