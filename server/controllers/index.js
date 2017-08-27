const userModel =  require('../models/user')
const taskModel =  require('../models/task')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var register = (req, res) => {
  var salt = bcrypt.genSaltSync(8)
  var password = bcrypt.hashSync(req.body.password, salt)

  userModel.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: password,
    salt: salt
  })
  .then(() => {
    res.send('data added')
  })
  .catch(err => {
    res.send(err)
  })
}

var login = (req, res) => {
  userModel.findOne({
    username: req.body.username
  })
  .then(dataUser => {
    // console.log(bcrypt.compareSync(req.body.password, dataUser.password));
    if (bcrypt.compareSync(req.body.password, dataUser.password)) {
      var token = jwt.sign({
        id: dataUser._id,
        username: dataUser.username
      }, process.env.TOKEN_JWT)
      res.send(token)
    }
    else {
      res.send('maaf, password salah')
    }
  })
  .catch(err => {
    console.log(err);
    res.send('maaf, username tidak ada')
  })
}


module.exports = {
  register,
  login
}
