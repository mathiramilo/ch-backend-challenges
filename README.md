# Coderhouse Backend Challenges

This repository contains all coderhouse backend challenges.

## Challenge 1 (Classes)

Create a class User and invoke all its methods.

```js
export class User {
  constructor(name, lastname, books, pets) {
    this.name = name
    this.lastname = lastname
    this.books = books
    this.pets = pets
  }

  getFullName = () => `${this.name} ${this.lastname}`

  addPet = (name) => this.pets.push(name)

  countPets = () => this.pets.length

  addBook = (title, author) => this.books.push({title, author})

  getBookNames = () => this.books.map(book => book.title)
}
```

## Challenge 2 (File Management)

### `FileSystem CRUD`

Nodejs FileSystem (fs) CRUD implementation using promises.

![First Menu](challenge2/readme/first-menu.jpg)
![Menu](challenge2/readme/menu.png)

```js
// Interfaces
Container {
  fileName: String

  save: (Product) => Number
  getById: (Number) => Product
  getAll: () => Product[]
  deleteById: (Number) => void
  deleteAll: () => void
}

Product {
  id: String
  title: String
  price: Number
  thumbnail: String
}
```

### Libraries

- **`fs (file system)`** (The Node.js file system module allows you to work with the file system on your computer)
- **`uuid`** (Used for creating unique ids)
- **`readline-sync`** (Synchronous Readline for interactively running to have a conversation with the user via a console (TTY) )
- **`colors`** (Used to get colors in the node.js console)
