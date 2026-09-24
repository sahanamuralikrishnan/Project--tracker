const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const taskRoutes = require("./routes/taskroutes");



dotenv.config({ path: path.join(__dirname, ".env") });

const userRoutes = require("./routes/userroutes");
const projectRoutes = require("./routes/projectroutes");

const mongoUri = process.env.MONGO_URI || process.env.Mongo_uri || process.env.mongo_uri;
const port = process.env.PORT || process.env.port || 5000;
const jwtSecret = process.env.JWT_SECRET || process.env.secret_key || "myprojectsecret";

process.env.MONGO_URI = mongoUri;
process.env.PORT = String(port);
process.env.JWT_SECRET = jwtSecret;

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Project Tracker backend is working");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
