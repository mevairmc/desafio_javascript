const db = require('../db/index')
const { v4 } = require('uuid');
const config = require('../config')

module.exports = {

  getAll: async function (req, res) {
    const { User } = await db(config.db)
    const allUsers = await User.getAll()
    res.status(200).json({
      result: "ok",
      data: allUsers
    })
  },

  login: async function (req,res){
    let userUpdated = null
    const {email, password} = req.body
    const { User } = await db(config.db)
    const userValidated = await User.validateUser({email, password})

    if(userValidated){
      userValidated.uuid = v4()
      userUpdated = await User.createOrUpdate(userValidated)
    }

    res.status(200).json({
      result: "ok",
      data: userUpdated
    })
  },

};