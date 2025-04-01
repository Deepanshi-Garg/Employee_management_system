const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: { type: String, default: null },
  isApproved: { type: Boolean, default: false },
  profilePicUrl: { type: String }, // Cloudinary URL
},
  { timestamp: true }
);

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;