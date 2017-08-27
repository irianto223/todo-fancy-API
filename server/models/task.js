const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  task: String,
  description: String,
  isDone: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task
