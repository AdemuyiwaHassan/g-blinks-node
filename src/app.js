const express = require("express");
const morgan = require("morgan");

const usersRoutes = require("./routes/usersRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// app.use(morgan("dev"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static(`${__dirname}/../public`));
app.use("/api/v1/users", usersRoutes); // Use the usersRoutes for /api/v1/users)
app.use("/api/v1/tasks", taskRoutes);

module.exports = app;
