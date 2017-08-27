const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))
const indexController = require('../controllers/index')

router.post('/login', indexController.login)
router.post('/register', indexController.register)

module.exports = router
