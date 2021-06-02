'use strict'
const { v4 } = require('uuid');
const faker = require('faker');

const db = require('../')
const config = require('../../config')

async function run () {
  const { User } = await db(config.db).catch(handleFatalError)

  for( let i  = 0; i< 100; i++){
    await User.createOrUpdate({
      uuid: v4(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).catch(handleFatalError)
  }

  console.log('100 users were created')


  return
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
