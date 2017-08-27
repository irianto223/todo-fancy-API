const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database connected');
})

const apiRouter = require('./routes/api')

app.use('/api', apiRouter)

app.listen(3000)
