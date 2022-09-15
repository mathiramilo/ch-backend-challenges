/* POST a product endpoint */
const url = 'http://localhost:8080/api/products'

/* Grab the necessary elements from the DOM, form, inputs, success indicators, etc. */
const form = document.getElementById('add-product-form')

const inputTitle = document.getElementById('title')
const inputPrice = document.getElementById('price')
const inputThumbnail = document.getElementById('thumbnail')

const successIndicatorBar = document.getElementById('success-indicator-bar')
const successIndicatorMessage = document.getElementById(
  'success-indicator-message'
)

/* Arrays that contains the necessary classes for each element */
const successBarCls = ['bg-green-400']
const failureBarCls = ['bg-red-400']

const successMsgCls = ['bg-green-300', 'border-green-400', 'text-green-700']
const failureMsgCls = ['bg-red-300', 'border-red-400', 'text-red-700']

/* Form submit event */
form.addEventListener('submit', handleSubmit)

async function handleSubmit(evt) {
  evt.preventDefault()

  const title = inputTitle.value
  const price = Number(inputPrice.value)
  const thumbnail = inputThumbnail.value

  const product = {
    title,
    price,
    thumbnail
  }

  try {
    // POST request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    response.json().then(data => {
      if (data.success) {
        // Product saved successfully
        successPost()
        resetInputs()
      } else {
        // Product could not be saved
        failurePost(data.error)
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
  successIndicatorMessage.innerText = 'Product saved successfully'
}

function failurePost(errorMsg) {
  successIndicatorBar.classList.remove('bg-gray-300', 'bg-green-400')
  successIndicatorBar.classList.add(...failureBarCls)

  successIndicatorMessage.classList.remove(...successMsgCls, 'hidden')
  successIndicatorMessage.classList.add(...failureMsgCls)
  successIndicatorMessage.innerText = errorMsg
}

function resetInputs() {
  inputTitle.value = ''
  inputPrice.value = ''
  inputThumbnail.value = ''
}
