'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./model/user')
const setupUser = require('./lib/user')
const defaults = require('defaults')
const {join} = require('path')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    storage: join(__dirname,'../storage/CAPTAHYDRO.db')
  })

  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })

  }

  const User = setupUser(UserModel)


  return {
    User
  }
}