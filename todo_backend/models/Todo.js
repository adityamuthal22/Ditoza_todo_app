const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description:{
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Todo', 'InProgress',"Done"],
    default: 'Todo'
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
