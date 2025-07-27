const { Router } = require("express");
const path = require("path");
const router = Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { isAuthenticated } = require("../middlewares/authentication");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.get("/add-new", isAuthenticated, (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/test/user", isAuthenticated, (req, res) => {
  res.json({
    user: req.user,
    userId: req.user._id,
    userType: typeof req.user._id
  });
});

router.post("/", isAuthenticated, upload.single("coverImage"), async (req, res) => {
  try {
    const { title, body } = req.body;
    
    if (!title || !body) {
      return res.status(400).render("addBlog", {
        user: req.user,
        error: "Title and body are required"
      });
    }

    const blogData = {
      body,
      title,
      createdBy: req.user._id,
    };

    if (req.file) {
      blogData.coverImageURL = `/uploads/${req.file.filename}`;
      console.log("Blog image URL:", blogData.coverImageURL);
    }

    const blog = await Blog.create(blogData);
    console.log("Created blog with image:", blog.coverImageURL);
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).render("addBlog", {
      user: req.user,
      error: "Error creating blog"
    });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    
    if (!blog) {
      return res.status(404).render("error", {
        user: req.user,
        message: "Blog not found"
      });
    }
    
    console.log("Blog cover image URL:", blog.coverImageURL);
    if (blog.createdBy) {
      console.log("User profile image URL:", blog.createdBy.profileImageURL);
    }
    
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );
    
    console.log("Comments found:", comments.length);
    comments.forEach((comment, index) => {
      console.log(`Comment ${index + 1}:`, {
        content: comment.content,
        createdBy: comment.createdBy,
        hasUser: !!comment.createdBy,
        userName: comment.createdBy ? comment.createdBy.fullName : 'No user',
        userId: comment.createdBy ? comment.createdBy._id : 'No ID',
        userEmail: comment.createdBy ? comment.createdBy.email : 'No email'
      });
    });
    
    return res.render("blog", {
      user: req.user,
      blog: blog,
      comments: comments,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).render("error", {
      user: req.user,
      message: "Error loading blog"
    });
  }
});

router.post("/comment/:blogId", isAuthenticated, async function (req, res) {
  try {
    const { content } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).redirect(`/blog/${req.params.blogId}`);
    }

    console.log("Creating comment with user ID:", req.user._id);
    console.log("User object:", req.user);

    const comment = await Comment.create({
      content: content.trim(),
      blogId: new mongoose.Types.ObjectId(req.params.blogId),
      createdBy: new mongoose.Types.ObjectId(req.user._id),
    });
    
    console.log("Created comment:", comment);
    
    res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.redirect(`/blog/${req.params.blogId}`);
  }
});

module.exports = router;