const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const register = async (req, res) => {
  // console.log("req",req.file.filename)
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with the same email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const createdUser = await User.create(user);

    // Generate a JWT token
    const token = jwt.sign(
      { user: createdUser._id },
      process.env.secret_key
    );

    res.status(201).send({
      message: "User Registration Successful",
      // user: createdUser,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found 1" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token

    const expiresIn = 24 * 60 * 60;
    const token = jwt.sign(
      { user: user._id},
      process.env.secret_key,
      { expiresIn: expiresIn }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = { register, login };
