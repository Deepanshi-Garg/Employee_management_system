require("dotenv").config();
const express = require("express");
const { upload } = require("../middlewares/upload.middleware.js");
const { createUser, userLogin } = require("../controllers/user.controller.js");

const userRouter = express.Router();

// user signup
userRouter.post("/register", upload.single("profilePic"), createUser);

// user login
userRouter.post("/login", userLogin);

module.exports = userRouter;