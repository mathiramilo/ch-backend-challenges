/* POST a user endpoint */
const API_URL = `${API_BASE_URL}/auth/register`

/* Grab the necessary elements from the DOM, form, inputs, success indicators, etc. */
const registerForm = document.getElementById('register-form')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const repeatPasswordInput = document.getElementById('repeat-password')
const successIndicatorBar = document.getElementById('success-indicator-bar')
const successIndicatorMessage = document.getElementById(
  'success-indicator-message'
)

/* Arrays that contains the necessary classes for each element */
const successBarCls = ['bg-green-400']
const failureBarCls = ['bg-red-400']
const successMsgCls = ['bg-green-300', 'border-green-400', 'text-green-700']
const failureMsgCls = ['bg-red-300', 'border-red-400', 'text-red-700']

/* Register event */
registerForm.addEventListener('submit', handleRegister)

function handleRegister(evt) {
  evt.preventDefault()

  const username = usernameInput.value
  const password = passwordInput.value
  const password2 = repeatPasswordInput.value

  if (username.length < 3) {
    failurePost('Username must be at least 3 characters long')
    return
  }

  if (!checkPassword(password)) {
    failurePost(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    return
  }

  if (password !== password2) {
    failurePost('Passwords must coincide')
    return
  }

  const userData = {
    username,
    password
  }

  try {
    // POST request
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    window.location.replace('http://localhost:8080/')
  } catch (error) {
    console.log(error)
  }
}

function successPost() {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-red-400')
  successIndicatorBar.classList.add(successBarCls)

  successIndicatorMessage.classList.remove(...failureMsgCls, 'hidden')
  successIndicatorMessage.classList.add(...successMsgCls)
  successIndicatorMessage.innerText = 'Registered successfully'
}

function failurePost(errorMsg) {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-green-400')
  successIndicatorBar.classList.add(...failureBarCls)

  successIndicatorMessage.classList.remove(...successMsgCls, 'hidden')
  successIndicatorMessage.classList.add(...failureMsgCls)
  successIndicatorMessage.innerText = errorMsg
}

function checkPassword(password) {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return regex.test(password)
}
