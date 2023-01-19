const { HTTP_STATUS } = require('../constants/api.constants')
const { HttpError } = require('../utils/api.utils')
const UsersDAO = require('../database/DAOs/users.dao')
const usersDAO = new UsersDAO()

const getUser = async id => await usersDAO.getById(id)

const getUserByUsername = async username => await usersDAO.getByUsername(username)

const saveUser = async data => {
  const user = await usersDAO.getByUsername(data.username)

  if (user) {
    throw new HttpError(HTTP_STATUS.BAD_REQUEST, `User with username ${data.username} already exists`)
  }

  const newUser = await usersDAO.save(data)

  return newUser
}

module.exports = {
  getUser,
  getUserByUsername,
  saveUser
}
