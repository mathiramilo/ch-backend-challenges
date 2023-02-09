const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
const mongoose = require('mongoose')
const app = require('../src/app')

let server

describe('Products API Tests', () => {
  before(async function () {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/ch-backend-challenges')

      server = app.listen(8080, () => {
        console.log('Server running on port 8080')
      })
    } catch (err) {
      throw new Error(err)
    }
  })

  after(function () {
    mongoose.disconnect()
    server?.close()
  })

  it('Get all products', async () => {
    const response = await request.get('/api/products')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.success).to.eql(true)
    expect(response.body.data).to.be.an('array')
  })

  it('Get product by id', async () => {
    const response = await request.get('/api/products/5f5b5a5c5f5d5a5a5f5d5a5a')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.success).to.eql(true)
    expect(response.body.data).to.be.an('object')
    expect(response.body.data).to.include.keys('id', 'title', 'price', 'thumbnail')
  })

  it('Create a new product', async () => {
    const payload = {
      title: 'test',
      price: 10,
      thumbnail: 'https://test.com/test.jpg'
    }

    const response = await request.post('/api/products').send(payload)

    expect(response.status).to.eql(201)
    expect(response.body).to.be.an('object')
    expect(response.body.data).to.include.keys('title', 'price', 'thumbnail')
    expect({
      title: response.body.title,
      price: response.body.price,
      thumbnail: response.body.thumbnail
    }).to.deep.eql(payload)
  })

  it('Update a product', async () => {
    const payload = {
      title: 'test edited',
      price: 15,
      thumbnail: 'https://test.com/test-edited.jpg'
    }

    const response = await request.put('/api/products/5f5b5a5c5f5d5a5a5f5d5a5a').send(payload)

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.success).to.eql(true)
    expect(response.body.data).to.include.keys('acknowledged', 'modifiedCount', 'thumbnail')
    expect(response.body.data.acknowledged).to.eql(true)
    expect(response.body.data.modifiedCount).to.eql(1)
  })

  it('Delete a product', async () => {
    const response = await request.delete('/api/products/5f5b5a5c5f5d5a5a5f5d5a5a')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.data).to.include.keys('acknowledged', 'deletedCount')
    expect(response.body.data.acknowledged).to.eql(true)
    expect(response.body.data.deletedCount).to.eql(1)
  })
})
