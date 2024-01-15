const Todo = require("../models/Todo");

// Create a new todo (admin only)
const createtodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todo = new Todo({
      title,
      description,
      status,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get all todos
const getAlltodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
    console.log("todos", todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Get a todo by ID
const gettodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

// Update a todo (admin only)
const updatetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete a todo (admin only)
const deletetodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: "todo not found" });
    }

    res.json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

module.exports = {
  createtodo,
  getAlltodos,
  gettodoById,
  updatetodo,
  deletetodo,
};
