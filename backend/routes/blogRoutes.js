const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { verifyUser } = require("../middleware/auth");

let blogs = [];
router.post("/blogs", verifyUser, createBlog);

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlog);

router.patch("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

module.exports = router;
