const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const { verifyJwt } = require("../utils/generateToken");
const Comment = require("../models/commentSchema");

// Create a blog
const createBlog = async (req, res) => {
  try {
    const author = req.user;
    console.log(author);

    const { title, content, draft } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        status: "fail",
        message: "Title and Content cannot be empty",
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
    const blogs = await Blog.find({ draft: false })
      .populate({
        path: "author",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "name email",
      })
      .populate({
        path: "comments",
        select: "content author",
      });
    return res.status(200).json({
      status: "success",
      data: blogs,
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
    const blog = await Blog.findById(id)
      .populate({
        path: "author",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "name email",
      })
      .populate({
        path: "comments",
        select: "content author",
      });

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
    const { id } = req.params; // Blog ID
    const { title, content, draft } = req.body; // Blog updates
    const creatorId = req.user; // Current user ID

    // Find and update the blog in one step, ensuring the creator matches
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id, author: creatorId }, // Filter: Match blog ID and author
      { title, content, draft }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found or you are not authorized to update this blog",
      });
    }

    return res.status(200).json({
      status: "success",
      data: updatedBlog,
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

    const creatorId = req.user; // User ID from the authenticated request (assuming middleware sets it)

    const blog = await Blog.findOneAndDelete({ _id: id, author: creatorId });
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found or you're not authorized to delete this blog",
      });
    }
    await User.findByIdAndUpdate(creatorId, {
      $pull: { blogs: id },
    });
    return res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Like a blog
const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = req.user;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(500).json({
        message: "Blog not found",
      });
    }
    if (!blog.likes.includes(creator)) {
      await Blog.findByIdAndUpdate(id, {
        $push: { likes: creator },
      });

      return res.status(200).json({
        status: "success",
        message: "Blog liked successfully",
      });
    } else {
      await Blog.findByIdAndUpdate(id, {
        $pull: { likes: creator },
      });
      return res.status(200).json({
        status: "success",
        message: "Blog unliked successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const commentBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const author = req.user;

    // Check if blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    // Create new comment
    const newComment = await Comment.create({
      content,
      author,
      blog: id,
    });

    // Add comment reference to blog
    await Blog.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    return res.status(201).json({
      status: "success",
      message: "Comment added successfully",
      data: newComment,
    });
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
  likeBlog,
  commentBlog,
};
