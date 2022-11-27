/* POST a product endpoint */
const url = 'http://localhost:8080/api/products'

/* Socket Server Connection */
const socket = io()

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
        // Emit 'new-product' event to the server
        socket.emit('new-product', product)
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

/* --- Products Table --- */

/* Listening 'products' event */
socket.on('products', data => {
  renderProducts(data.products)
})

function renderProducts(products) {
  let html
  if (products.length > 0) {
    // There are products
    let productsHtml = ''
    products.forEach(product => {
      productsHtml += `
        <tr class="border-b-[1px] border-gray-200 cursor-pointer transition-colors hover:bg-gray-50">
          <td class="pl-2 pr-14 sm:pr-48 py-2">${product.title}</td>
          <td class="pr-14 sm:pr-48 py-2">${product.price}</td>
          <td class="py-2"><img src=${product.thumbnail} alt=${product.title} class="w-8 mx-auto"/></td>
        </tr>
      `
    })
    html = `
      <table class="table-fixed border-collapse overflow-scroll max-w-[100vw]">
        <thead class="text-gray-800 border-b-[1px] border-gray-400">
          <tr>
            <th class="text-start pl-2 py-2">Title</th>
            <th class="text-start py-2">Price</th>
            <th class="text-center pr-2 py-2">Thumbnail</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          ${productsHtml}
        </tbody>
      </table>
    `
  } else {
    // There isn't products
    html = `
      <h2 class="text-center text-neutral-900 mt-8 mb-8 font-normal text-2xl">❌ There are not products</h2>
    `
  }

  document.getElementById('products-container').innerHTML = html
}
