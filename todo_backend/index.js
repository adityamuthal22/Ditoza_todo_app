const express = require('express');
const connectDB = require('./config/databaseConfig');
require("dotenv").config()

const cors = require("cors");
const userRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');

const app = express();
const port = process.env.PORT || 8081;

// Middleware

app.use(express.json());
app.use(cors())


// Routes
app.get("/", (req, res) => {
  res.send("home");
});


app.use('/api/auth', userRouter);
app.use('/api', todoRouter);





app.listen(port, async () => {
  try {
    await connectDB()
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
