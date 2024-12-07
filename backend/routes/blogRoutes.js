const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentBlog,
} = require("../controllers/blogController");
const { verifyUser } = require("../middleware/auth");

router.post("/blogs", verifyUser, createBlog);

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlog);

router.patch("/blogs/:id", verifyUser, updateBlog);

router.delete("/blogs/:id", verifyUser, deleteBlog);

router.post("/blogs/:id/likes", verifyUser, likeBlog);

router.post("/blogs/:id/comments", verifyUser, commentBlog);

module.exports = router;
