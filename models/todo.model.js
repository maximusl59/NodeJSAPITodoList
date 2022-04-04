const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
  todoName: String,
  todoCategory: String ,
  todoOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{
  timestamps:true
})

module.exports = mongoose.model('Todo', todoSchema)