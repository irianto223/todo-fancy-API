const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database connected');
})

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(3000)
