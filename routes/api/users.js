const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//verify token
const verify = require('../../verifyToken');
//validation
const { registerValidation, loginValidation } = require("../../validation");
// import the user model
const User = require("../../models/User");

// api GET /api/users/test
// goal testing route
// public
router.get("/:userEmail",async (req, res) => {
  const email = req.params.userEmail;
  const user = await User.findOne({email});
  try {
      res.status(200).send({username: user.name});
  } catch (error) {
    res.status(400).send(error);
  }
});
// api GET /api/users/test
// goal testing route
// private
router.get("/",async (req, res) => {
  const users = await User.find();
  try {
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// api POST /api/users/register
// goal registering a user
// public
router.post("/register", async (req, res) => {
  //validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.send({ message: error.details[0].message });
  //check if the email already exists
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail)
    return res.send({ message: "Email Already Exist" });
  //hash the password !
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: hashPass
  });
  const saveUser = await user.save();
  try {
    res.status(200).json({
      _id: user._id,
      message: "User has been Saved"
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
// api POST /api/users/login
// goal login a user
// public (for registed people)
router.post("/login", async (req, res) => {
  //validating the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //existing user
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "Invalid Email !" });
  //correct password !
  const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPassCorrect)
    return res.status(400).send({ message: "Invalid Password !" });

  // creating and assigning a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json(token);
});

module.exports = router;
