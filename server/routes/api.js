const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))
const userController = require('../controllers/user')

router.get('/users', userController.getAllData)
router.get('/users/:id', userController.getData)
router.post('/users', userController.register)
router.put('/users/:id', userController.edit)
router.delete('/users/:id', userController.remove)
router.post('/users/login', userController.login)

module.exports = router
