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
router.post('/register', userController.register)
router.put('/users/:id', userController.edit)
router.delete('/users/:id', userController.remove)
router.post('/login', userController.login)
router.get('/tasks', userController.getAllTasks)
router.get('/users/:id/tasks', userController.getTasks)
router.post('/users/:id/addTask', userController.addTask)
router.delete('/users/:id/removeTask/:idTask', userController.removeTask)
router.patch('/users/:id/switchStatus/:idTask', userController.switchStatus)
router.patch('/users/:id/editTask/:idTask', userController.editTask)

module.exports = router
