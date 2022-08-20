/* 

  User {
    name: String
    lastname: String
    books: Book[]
    pets: String[]

    getFullName: () => String
    addPet: (name: String) => void
    countPets: () => Number
    addBook: (title: String, author: String) => void
    getBookNames: () => String[]
  }
  
  Book {
    title: String
    author: String
  }

*/

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
