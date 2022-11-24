/* POST a user endpoint */
const url = 'http://localhost:8080/login'

/* Grab the necessary elements from the DOM, form, inputs, success indicators, etc. */
const loginForm = document.getElementById('login-form')
const usernameInput = document.getElementById('username')
const successIndicatorBar = document.getElementById('success-indicator-bar')

/* Arrays that contains the necessary classes for each element */
const successBarCls = ['bg-green-400']
const failureBarCls = ['bg-red-400']

/* Login event */
loginForm.addEventListener('submit', handleLogin)

function handleLogin(evt) {
  evt.preventDefault()

  const username = usernameInput.value

  try {
    // POST request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
    window.location.replace('localhost:8080')
  } catch (error) {
    console.log(error)
  }
}

function successMessage() {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-red-400')
  successIndicatorBar.classList.add(successBarCls)
}

function failureMessage() {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-green-400')
  successIndicatorBar.classList.add(...failureBarCls)
}

function resetMessageInput() {
  loginInput.value = ''
}
