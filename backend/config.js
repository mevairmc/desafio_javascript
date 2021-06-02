
'use strict'

const { join } = require('path')

require('dotenv').config({
  path: join(__dirname, '.env')
})

const config = {
  db: {
    storage:  join(__dirname,"./storage/", `${process.env.DB_STORAGE}.db`),
    dialect: 'sqlite'
  }
}

module.exports =  config