const Blog = require("../models/blogSchema");

// Create a blog
const createBlog = async (req, res) => {
  try {
    const { title, content, draft } = req.body;
    if (!title) {
      return res.status(400).json({
        status: "fail",
        message: "Title is required",
      });
    }
    if (!content) {
      return res.status(400).json({
        status: "fail",
        message: "Content is required",
      });
    }

    // Create a new blog
    const blog = await Blog.create({ title, content, draft });
    return res.status(200).json({
      status: "success",
      data: {
        blog,
      },
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
    const blogs = await Blog.find({ draft: false }); // Retrieve all blogs
    return res.status(200).json({
      status: "success",
      data: {
        blogs,
      },
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
      data: {
        blog,
      },
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
      data: {
        blog,
      },
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
