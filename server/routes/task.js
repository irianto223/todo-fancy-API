const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))
const taskController = require('../controllers/task')

router.get('/', taskController.getAllTasks)

module.exports = router
