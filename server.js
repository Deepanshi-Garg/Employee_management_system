require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/user.route.js");
const empRouter = require("./routes/employee.route.js");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/employees",empRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});