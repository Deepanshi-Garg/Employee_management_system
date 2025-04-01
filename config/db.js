const mongoose = require("mongoose");
require('dotenv').config();

const DB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error('error during mongo db connection:', err);
    process.exit(1);
  }
};

module.exports = connectDB;