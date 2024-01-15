const express = require('express');
const todoController =require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new todo 
router.post('/todo', authMiddleware, todoController.createtodo);

// Get all todos
router.get('/todo', authMiddleware, todoController.getAlltodos);

// Get a todo by ID
router.get('/todo/:id', authMiddleware, todoController.gettodoById);

// Update a todo 
router.put('/todo/:id', authMiddleware,  todoController.updatetodo);

// Delete a todo 
router.delete('/todo/:id', authMiddleware, todoController.deletetodo);

module.exports = router;
