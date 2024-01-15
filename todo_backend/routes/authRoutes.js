const express = require('express');
const authController = require('../controllers/authController');

const userRouter = express.Router();


// Register a new user
userRouter.post('/register', authController.register);

// Login
userRouter.post('/login', authController.login);


module.exports = userRouter;
