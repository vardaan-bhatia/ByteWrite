const express = require("express");
const router = express.Router();
console.log("blog route");

router.get("/blogs", (req, res) => {
  try {
    res.send(400).json({ message: "All Blogs" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogs/:id", (req, res) => {
  try {
    res.send("Single Blog");
  } catch (error) {
    console.log(error);
  }
});

router.post("/blogs", (req, res) => {
  try {
    res.send("Create Blog");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/blogs/:id", (req, res) => {
  try {
    res.send("Update Blog");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/blogs/:id", (req, res) => {
  try {
    res.send("Delete Blog");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
