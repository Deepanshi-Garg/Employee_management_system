require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model.js");
const { uploadImageCloud } = require("../middlewares/upload.middleware.js");

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "missing feilds!" });
    try {
        let profilePicUrl = null;
        if (req.file) {
            profilePicUrl = await uploadImageCloud(req.file.path);
            console.log('profilepicURL = ', profilePicUrl);
        }
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        const user = new userModel({
            name, email,
            password: pass,
            profilePicUrl,
            role: role ? role : 'user'
        });
        await user.save();
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ message: "something went wrong, please try again later!" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "missing feilds!" });
    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password)))
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: "something went wrong, please try again later!" });
    }
};


module.exports = { createUser, userLogin }