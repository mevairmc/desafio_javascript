'use strict'
const bcrypt = require('bcryptjs')

module.exports = function setupUser (userModel) {
  async function createOrUpdate (user) {
    const founded = {
      where: {
        email: user.email
      }
    }

    const existingUser = await userModel.findOne(founded)

    if (existingUser) {
      const updated = await userModel.update(user, founded)
      return updated ? userModel.findOne(founded) : existingUser
    }

    user.password = await encrypt(user.password)
    const result = await userModel.create(user)
    return result.toJSON()
  }

  function getAll () {
    return userModel.findAll()
  }

  async function findByEmail (email) {
    return userModel.findOne({
      where: {
        email
      }
    })
  }

  async function encrypt(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds) // esta función es asíncrona
  }

  async function validateUser({ email, password }) {
    console.log(email)
    const userFound = await findByEmail(email)
    if (userFound) {
      const passwordRight = await bcrypt.compare(
        password,
        userFound.password
      )
      return passwordRight ? userFound : false
    }
    return false
  }


  return {
    createOrUpdate,
    getAll,
    validateUser
  }
}