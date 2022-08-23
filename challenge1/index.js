import { User } from './classes/User.js'

/* Create an User with arbitrary values
and call all its methods */

const books = [
  {
    title: 'Where the Crawdads Sign',
    author: 'Delia Owens'
  },
  {
    title: 'Verity',
    author: 'Collen Hoover'
  },
  {
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer'
  },
  {
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk'
  },
  {
    title: 'The 6:20 Man',
    author: 'David Baldacci'
  }
]

const pets = ['Polo', 'Cala', 'Emma', 'Thor', 'Fosty', 'Rocco', 'Balbo', 'Lucho']


const user = new User('Michael', 'Jordan', books, pets)
viewUserInfo(user)


function viewUserInfo(user) {
  console.log('User Info:\n');

  console.log(`Fullname: ${user.getFullName()}`)

  user.addBook('Fahrenheit 451', 'Ray Bradbury')
  console.log(`Books: ${user.getBookNames()}`)

  user.addPet('Tyson')
  console.log(`Pets Amount: ${user.countPets()}\n`)
}
