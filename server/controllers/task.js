const userModel =  require('../models/user')
const taskModel =  require('../models/task')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var getAllTasks = (req, res) => {
  taskModel.find().populate('user')
  .then(dataTasks => {
    res.send(dataTasks)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllTasks
}
