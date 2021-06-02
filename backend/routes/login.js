const express = require('express');
const router = express.Router();
const { validationResult, body, param, query } = require('express-validator')
const controllerUser = require('../controller/users.controller')

router.post(
  '/',
  [
    body('email').isString(),
    body('password').isString()
  ],
    async function(req, res, next){
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'NOK',
          errors: errors.array()
        })
      }
      next()
    },
    controllerUser.login
  );


module.exports = router;