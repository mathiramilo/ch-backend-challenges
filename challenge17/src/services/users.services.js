const { HTTP_STATUS } = require('../constants/api.constants')
const { HttpError } = require('../utils/api.utils')
const UsersDAO = require('../database/DAOs/users.dao')

const getUser = async id => await UsersDAO.getById(id)

const getUserByUsername = async username => await UsersDAO.getByUsername(username)

const saveUser = async data => {
  const user = await UsersDAO.getByUsername(data.username)

  if (user) {
    throw new HttpError(HTTP_STATUS.BAD_REQUEST, `User with username ${data.username} already exists`)
  }

  const newUser = await UsersDAO.save(data)

  return newUser
}

module.exports = {
  getUser,
  getUserByUsername,
  saveUser
}
