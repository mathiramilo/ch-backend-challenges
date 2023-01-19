/* POST a user endpoint */
const API_URL = `${API_BASE_URL}/auth/login`

/* Grab the necessary elements from the DOM, form, inputs, success indicators, etc. */
const loginForm = document.getElementById('login-form')
const usernameInput = document.getElementById('username')
const successIndicatorBar = document.getElementById('success-indicator-bar')
const successIndicatorMessage = document.getElementById(
  'success-indicator-message'
)

/* Arrays that contains the necessary classes for each element */
const successBarCls = ['bg-green-400']
const failureBarCls = ['bg-red-400']
const successMsgCls = ['bg-green-300', 'border-green-400', 'text-green-700']
const failureMsgCls = ['bg-red-300', 'border-red-400', 'text-red-700']

/* Login event */
loginForm.addEventListener('submit', handleLogin)

function handleLogin(evt) {
  evt.preventDefault()

  const username = usernameInput.value

  try {
    // POST request
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    }).then(res => {
      if (res.status === 200) {
        successPost()
        window.location.replace('localhost:8080')
      } else {
        failurePost('Invalid username or password')
      }
    })
  } catch (error) {
    console.log(error)
  }
}

function successPost() {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-red-400')
  successIndicatorBar.classList.add(successBarCls)

  successIndicatorMessage.classList.remove(...failureMsgCls, 'hidden')
  successIndicatorMessage.classList.add(...successMsgCls)
  successIndicatorMessage.innerText = 'Logged in successfully'
}

function failurePost(errorMsg) {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-green-400')
  successIndicatorBar.classList.add(...failureBarCls)

  successIndicatorMessage.classList.remove(...successMsgCls, 'hidden')
  successIndicatorMessage.classList.add(...failureMsgCls)
  successIndicatorMessage.innerText = errorMsg
}
