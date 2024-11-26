const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

let blogs = [];

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlog);

router.post("/blogs", createBlog);

router.patch("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

module.exports = router;
