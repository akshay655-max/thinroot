const { Router } = require("express");
const {
  getUsers,
  loginUser,
  registerUser,
  getUserByEmail,
  checkSecurityQuestion,
  resetUserPassword,
} = require("../controlers/userController");

const { authenticate } = require("../middlewares/authMiddleware");

const userRoute = Router();

//to get all users
userRoute.get("/", getUsers);

//to check a user by email
userRoute.post("/", getUserByEmail);

//to register a user
userRoute.post("/register", registerUser);

//to login a user
userRoute.post("/login", loginUser);

//to check matches the security question
userRoute.post("/:id", checkSecurityQuestion);

//to update new password
userRoute.put("/reset/:id", authenticate, resetUserPassword);

module.exports = { userRoute };
