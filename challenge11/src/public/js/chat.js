/* POST a message endpoint */
const url = 'http://localhost:8080/api/messages'

/* Grab the necessary elements from the DOM, form, inputs, success indicators, etc. */
const messagesContainer = document.getElementById('messages')
const sendMessageForm = document.getElementById('send-message-form')
const emailInput = document.getElementById('email')
const myMessageInput = document.getElementById('my-message')
const successIndicatorBar = document.getElementById('success-indicator-bar')
const emailAlert = document.getElementById('email-alert')

/* Arrays that contains the necessary classes for each element */
const successBarCls = ['bg-green-400']
const failureBarCls = ['bg-red-400']

/* Socket Server Connection */
const socket = io()

/* Listening 'messages' event */
socket.on('messages', data => {
  renderMessages(data.messages)
  messagesContainer.scroll({
    top: messagesContainer.scrollHeight,
    behavior: 'smooth'
  })
})

/* Send message */
sendMessageForm.addEventListener('submit', handleSubmit)

async function handleSubmit(evt) {
  evt.preventDefault()

  const email = emailInput.value
  const text = myMessageInput.value

  if (!text) {
    emailAlert.innerText = ''
    return
  }

  const message = {
    email,
    text
  }

  try {
    // POST request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    response.json().then(data => {
      if (data.success) {
        // Message saved successfully
        successMessage()
        resetMessageInput()
        // Emit 'new-message' event to the server
        socket.emit('new-message', message)
      } else {
        // Message could not be saved
        failureMessage()
      }
    })
  } catch (error) {
    console.log(error)
  }
}

function successMessage() {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-red-400')
  successIndicatorBar.classList.add(successBarCls)

  emailAlert.innerText = ''
}

function failureMessage() {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-green-400')
  successIndicatorBar.classList.add(...failureBarCls)

  emailAlert.innerText = 'Enter an email to send a message'
}

function resetMessageInput() {
  myMessageInput.value = ''
}

function renderMessages(messages) {
  let html = ''

  messages.forEach(msg => {
    html += `
      <div>
        <span class="text-sm text-cyan-400">${msg.email}</span>
        <span class="text-xs text-amber-400">${msg.date}</span>
        <span class="text-sm text-gray-900">${msg.text}</span>
      </div>
    `
  })

  document.getElementById('messages').innerHTML = html
}
