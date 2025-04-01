const express = require("express");
const userValidate = require("../middlewares/auth.middleware.js");
const { createEmployee, employeeLogin, employeeDetail, updateEmp, delEmployee } = require("../controllers/employee.controller.js");
const { upload } = require("../middlewares/upload.middleware.js");

const empRouter = express.Router();

// employee signup
empRouter.post("/register", upload.single("profilePic"), createEmployee);

// employee login
empRouter.post("/login", employeeLogin);

// get employee details
empRouter.get("/", userValidate, employeeDetail);

// update employee details
empRouter.patch("/update", userValidate, upload.single("profilePic"), updateEmp);

// delete employee
empRouter.delete("/delete", userValidate, delEmployee);

module.exports = empRouter;