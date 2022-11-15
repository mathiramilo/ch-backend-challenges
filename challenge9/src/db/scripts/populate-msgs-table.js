const { sqlite } = require('../config')
const knex = require('knex')(sqlite)

const messages = [
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 8:37:53 PM',
    text: 'Hi! How are you doing?'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: '9/29/2022, 8:40:16 PM',
    text: 'Pretty fine, what about you?'
  },
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 8:41:01 PM',
    text: 'Chilling at home, are you doing something tonight?'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: '9/29/2022, 8:41:52 PM',
    text: 'I go to the movies with the girls, and you?'
  },
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 8:42:46 PM',
    text: 'To the bar with the boys'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: '9/29/2022, 8:43:35 PM',
    text: 'Thats nice!'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: '9/29/2022, 8:43:42 PM',
    text: 'Have fun!'
  },
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 8:44:01 PM',
    text: 'Thank you!'
  },
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 8:44:13 PM',
    text: 'You too'
  },
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 8:44:35 PM',
    text: 'By the way, what movie are you going to see?'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: '9/29/2022, 8:44:55 PM',
    text: 'Avengers End Game'
  },
  {
    email: 'jessicasmith@outlook.com',
    date: '9/29/2022, 8:45:02 PM',
    text: 'Do you like Marvel?'
  },
  {
    email: 'johndoe@gmail.com',
    date: '9/29/2022, 9:50:29 PM',
    text: 'Of courseee!'
  }
]

const populateMsgsTable = async () => {
  try {
    const exists = await knex.schema.hasTable('messages')
    if (exists) {
      await knex('messages').insert(messages)
    }
  } catch (error) {
    console.log(error)
  } finally {
    knex.destroy()
  }
}

populateMsgsTable()
