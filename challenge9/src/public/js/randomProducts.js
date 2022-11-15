/* Get random products endpoint */
const url = 'http://localhost:8080/api/products/test'

fetch(url)
  .then(res => res.json())
  .then(data => {
    const products = data.result
    renderProducts(products)
  })
  .catch(err => console.log(err))

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
