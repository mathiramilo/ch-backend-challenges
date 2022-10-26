# 1. Add 10 documents with diferent values to the messages and products collection

db.messages.insertMany([
  {
    email: 'johndoe@gmail.com',
    date: new Date('2022-09-29T20:37:53Z'),
    text: 'Hi! How are you doing?'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: new Date('2022-09-29T20:38:24Z'),
    text: 'Pretty fine, what about you?'
  },
  {
    email: 'johndoe@gmail.com',
    date: new Date('2022-09-29T20:38:58Z'),
    text: 'Chilling at home, are you doing something tonight?'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: new Date('2022-09-29T20:40:12Z'),
    text: 'I go to the movies with the girls, and you?'
  },
  {
    email: 'johndoe@gmail.com',
    date: new Date('2022-09-29T20:41:38Z'),
    text: 'To the bar with the boys'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: new Date('2022-09-29T20:41:59Z'),
    text: 'Thats nice!'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: new Date('2022-09-29T20:43:18Z'),
    text: 'Have fun!'
  },
  {
    email: 'johndoe@gmail.com',
    date: new Date('2022-09-29T20:58:23Z'),
    text: 'Thank you!'
  },
  {
    email: 'johndoe@gmail.com',
    date: new Date('2022-09-29T21:02:47Z'),
    text: 'You too'
  },
  {
    email: 'johndoe@gmail.com',
    date: new Date('2022-09-29T21:02:59Z'),
    text: 'By the way, what movie are you going to see?'
  }
])

db.products.insertMany([
  {
    title: 'Ruler',
    price: 124.8,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
  },
  {
    title: 'Calculator',
    price: 234.5,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
  },
  {
    title: 'Globe',
    price: 345.6,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png'
  },
  {
    title: 'Pencil',
    price: 80.7,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png'
  },
  {
    title: 'Apple',
    price: 24.2,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/apple-fruit-science-school-128.png'
  },
  {
    title: 'Backpack',
    price: 200.6,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png'
  },
  {
    title: 'Bus',
    price: 4900.7,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png'
  },
  {
    title: 'Paper Plane',
    price: 12,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png'
  },
  {
    title: 'Clock',
    price: 190.9,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png'
  },
  {
    title: 'Folder',
    price: 68.5,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/Futurosoft%20Icons%200.5.2/128x128/filesystems/folder_image.png'
  }
])

# 2. Define the documents keys in relation to the fields of the tables for that base

# 3. List all documents of each collection
db.messages.find()
db.products.find()

# 4. Show the total number of documents of each collection
db.messages.estimatedDocumentCount()
db.products.estimatedDocumentCount()

# 5. CRUD on products collection

## 5.A. Add a new product
db.products.insertOne({
  title: 'Gif',
  price: 45.2,
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/pleasant/GIF-Image.png'
})

## 5.B. Find with filters

### 5.B.1. Find products with price lower than 1000
db.products.find({ price: { $lt: 1000 } })
### 5.B.2. Find products with price between 1000 and 3000
db.products.find({ $and: [{ price: { $gt: 1000 } }, { price: { $lt: 3000 } }] })
### 5.B.3. Find products with price greater than 3000
db.products.find({ price: { $gt: 3000 } })
### 5.B.4. Find the title of the third most cheaper product
db.products.find({}, { title: 1 }).sort({ price: 1 }).limit(1).skip(2)

## 5.C. Update all products, adding a new field called stock with a value of 100
db.products.updateMany({}, { $set: { stock: 100 } })

## 5.D. Update all products with a price greater than 4000, setting the stock to 0
db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } })

## 5.E. Delete all products with a price lower than 1000
db.products.deleteMany({ price: { $lt: 1000 } })

# 6. Create an user called 'pepe' with password 'asd456' that can only read the database
use admin
db.createUser({
  user: 'pepe',
  pwd: 'asd456',
  roles: [
    {
      role: 'read',
      db: 'ch-challenges-ecommerce'
    }
  ]
})
