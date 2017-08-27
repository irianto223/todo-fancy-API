const userModel =  require('../models/user')
const taskModel =  require('../models/task')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var getAllData = (req, res) => {
  userModel.find().populate('todos')
  .then(dataUsers => {
    res.send(dataUsers)
  })
  .catch(err => {
    res.send(err)
  })
}

var getData = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    userModel.findOne({
      _id: ObjectId(req.params.id)
    }).populate('todos')
    .then(dataUser => {
      var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
      if (decoded.id == dataUser.id) {
        res.send(dataUser)
      }
      else {
        res.sendStatus(401)
      }
    })
    .catch(err => {
      res.send(err)
    })
  }
}

var edit = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {

      var salt = bcrypt.genSaltSync(8)
      var password = bcrypt.hashSync(req.body.password, salt)

      userModel.update({
        _id: ObjectId(req.params.id)
      },
      {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: password,
        salt: salt
      })
      .then(() => {
        res.send('data updated')
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.sendStatus(401)
    }
  }
}

var remove = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {

      userModel.remove({
        _id: ObjectId(req.params.id)
      })
      .then(() => {
        res.send('data removed')
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.sendStatus(401)
    }
  }
}

var addTask = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {
      taskModel.create({
        task: req.body.task,
        description: req.body.description,
        isDone: false,
        user: ObjectId(req.params.id)
      })
      .then(() => {
        res.send('task added')
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.sendStatus(401)
    }
  }
}

var getTasks = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {
      taskModel.find({
        user: ObjectId(req.params.id)
      })
      .then(dataTasks => {
        res.send(dataTasks)
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.sendStatus(401)
    }
  }
}

var removeTask = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {

      taskModel.remove({
        _id: ObjectId(req.params.idTask),
        user: decoded.id
      })
      .then(() => {
        res.send('data removed')
      })
      .catch(err => {
        res.send(err)
      })

    }
    else {
      res.sendStatus(401)
    }
  }
}

var switchStatus = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {

      taskModel.findOne({
        _id: ObjectId(req.params.idTask)
      })
      .then(data => {

        if (data.isDone == false) {
          taskModel.update({
            _id: data._id,
            user: data.user
          },
          {
            isDone: true
          })
          .then(() => {
            res.send('status isDone switched TRUE')
          })
          .catch(err => {
            res.send(err)
          })
        }
        else {
          taskModel.update({
            _id: data._id,
            user: data.user
          },
          {
            isDone: false
          })
          .then(() => {
            res.send('status isDone switched FALSE')
          })
          .catch(err => {
            res.send(err)
          })
        }

      })
    }
    else {
      res.sendStatus(401)
    }
  }
}

var editTask = (req, res) => {
  if (req.headers.token == null) {
    res.send('anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT)
    // console.log(decoded);
    if (decoded.id == ObjectId(req.params.id)) {

      taskModel.update({
        _id: ObjectId(req.params.idTask),
        user: decoded.id
      },
      {
        task: req.body.task,
        description: req.body.description
      })
      .then(() => {
        res.send('data updated')
      })
      .catch(err => {
        res.send(err)
      })

    }
    else {
      res.sendStatus(401)
    }
  }
}


module.exports = {
  getAllData,
  getData,
  edit,
  remove,
  addTask,
  getTasks,
  removeTask,
  switchStatus,
  editTask
}
