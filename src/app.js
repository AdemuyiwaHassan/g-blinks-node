const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const { auth } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/users", auth, userRouter);
app.use("/api/v1/posts", auth, postRouter);


// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy and running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
