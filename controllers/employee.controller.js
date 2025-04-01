require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const employeeModel = require("../models/employee.model.js");
const { uploadImageCloud } = require("../middlewares/upload.middleware.js");

const createEmployee = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "missing feilds!" });
        let profilePicUrl = null;
        if (req.file) {
            profilePicUrl = await uploadImageCloud(req.file.path);
            console.log('profilepicURL = ', profilePicUrl);
        }
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        const employee = new employeeModel({
            name,
            email,
            password: pass,
            profilePicUrl,
        });
        await employee.save();
        res.status(201).json({ message: "employee registered", employee });
    } catch (err) {
        res.status(500).json({ message: "something went wrong, please try again later!" });
    }
};

const employeeLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "missing feilds!" });
    try {
        const employee = await employeeModel.findOne({ email });
        if (!employee || !(await bcrypt.compare(req.body.password, employee.password)))
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.json({ employee, token });
    } catch (err) {
        res.status(500).json({ message: "something went wrong, please try again later!" });
    }
};

const employeeDetail = async (req, res) => {
    const { id } = req.user;
    try {
        const employee = await employeeModel.findById(id);
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: "error during fetching employee detail" });
    }
};

const updateEmp = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, email, position } = req.body;
        if (!name && !email && !position && !req.file) return res.status(400).json({ message: "atleast one feild is required!" });

        const employee = await employeeModel.findById(id);
        let profilePicUrl = null;
        if (req.file) {
            if (employee.ProfilePicture) {
                try {
                    const publicId = employee.ProfilePicture.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(`uploads/${publicId}`);
                } catch (error) {
                    res.status(500).json({ message: "something went wrong during file delete on cloudinary!" })
                }
            }
            profilePicUrl = await uploadImageCloud(req.file.path);
            console.log('profilepicURL = ', profilePicUrl);
            employee.profilePicUrl = profilePicUrl;
        }
        
        if (name) employee.name = name;
        if (email) employee.email = email;
        if (position) employee.position = position;
        
        employee.save();
        res.status(200).json({ message: "employee updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "something went wrong during updating employee detail" });
    }
};

const delEmployee = async (req, res) => {
    const { id } = req.user;
    try {
        const employee = await employeeModel.findById(id);
        if (employee.ProfilePicture) {
            try {
                const publicId = employee.ProfilePicture.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`uploads/${publicId}`);
            } catch (error) {
                res.status(500).json({ message: "something went wrong during file delete on cloudinary!" })
            }
        }
        await employeeModel.findByIdAndDelete(id);
        res.status(200).json({message: `${employee} deleted successfully`});
    } catch (err) {
        res.status(500).json({ message: "error during fetching employee detail" });
    }
};

module.exports = { createEmployee, employeeLogin, employeeDetail, updateEmp, delEmployee }