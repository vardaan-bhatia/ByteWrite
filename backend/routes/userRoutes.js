const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
console.log("user route");

router.get("/users", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    let newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/users/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
