const express = require('express');
const { validationResult, body, param, query } = require('express-validator')
const userController = require('../controller/users.controller');

const router = express.Router();


router.get('/',

  userController.getAll)




module.exports = router;