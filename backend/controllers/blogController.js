const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const { verifyJwt } = require("../utils/generateToken");

// Create a blog
const createBlog = async (req, res) => {
  try {
    const { title, content, draft, author } = req.body;
    if (!title && !content && !author) {
      return res.status(400).json({
        status: "fail",
        message: "Title,Content & Author is required",
      });
    }
    const findUser = await User.findById(author);

    if (!findUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    // Create a new blog
    const blog = await Blog.create({ title, content, draft, author });
    await User.findByIdAndUpdate(author, {
      $push: { blogs: blog._id },
    });
    return res.status(200).json({
      status: "success",
      data: [blog],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false }).populate({
      path: "author",
      select: "-password",
    }); // Retrieve all blogs
    return res.status(200).json({
      status: "success",
      data: [blogs],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get a single blog by ID
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: [blog],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, draft } = req.body;

    // Update the blog
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, draft },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: [blog],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    return res.status(204).send(); // No content
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
