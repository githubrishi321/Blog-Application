require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/blogify")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Blog = require("./models/blog");

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Routes
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).populate("createdBy").sort({ createdAt: -1 });
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.render("home", {
      user: req.user,
      blogs: [],
    });
  }
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", {
    user: req.user,
    message: "Page not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    user: req.user,
    message: "Something went wrong!"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});