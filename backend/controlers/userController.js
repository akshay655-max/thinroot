const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//to get all users
const getUsers = async (req, res) => {
  try {

    let users = await UserModel.find({});
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Users not found" });
  }
};

//to register a user
const registerUser = async (req, res) => {
  console.log("Registering user");
  const { name, email, phone, password, security_question } = req.body;
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(200).json({ message: "user already exists" });
    return;
  }
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      security_question,
    });
    await user.save();
    res.status(200).json({ message: "User Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

//to login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(200).json({ message: "User not exists" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(200).json({ message: "Wrong password" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
          name: user.name,
          email: user.email,
          token: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

//to get a user by its email
const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      res.status(200).json({ message: "user does not exists" });
      return;
    }
    res.status(200).json({ userId: userExists._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to reset the password" });
  }
};

//to check security question and answer match or not
const checkSecurityQuestion = async (req, res) => {
  const { question, answer } = req.body.security_question;
  console.log(question, answer);
  try {
    let user = await UserModel.findById({ _id: req.params.id });
    if (
      question === user.security_question.question &&
      answer === user.security_question.answer
    ) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        token: token,
        message:"security question verified"
      });
    } else if (question !== user.security_question.question) {
      res.status(200).json({ message: "Wrong question selected" });
    } else if (answer !== user.security_question.answer) {
      res.status(200).json({ message: "Wrong answer" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to check the security question" });
  }
};

//to reset a user password
const resetUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  let hashedNewPassword = await bcrypt.hash(newPassword, 10);
  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { password: hashedNewPassword }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the password" });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getUserByEmail,
  checkSecurityQuestion,
  resetUserPassword,
};
