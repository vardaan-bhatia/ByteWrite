const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  createComment,
  deleteComment,
} = require("../controllers/blogController");
const { verifyUser } = require("../middleware/auth");
const upload = require("../utils/multer");

router.post("/blogs", verifyUser, upload.single("image"), createBlog);

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlog);

router.patch("/blogs/:id", verifyUser, updateBlog);

router.delete("/blogs/:id", verifyUser, deleteBlog);

router.post("/blogs/:id/likes", verifyUser, likeBlog);

router.post("/blogs/:id/comments", verifyUser, createComment);

router.post("/blogs/:id/deletecomment", verifyUser, deleteComment);

module.exports = router;
