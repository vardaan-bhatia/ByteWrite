const express = require("express");
const router = express.Router();
const {
  postUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.post("/users", postUser);

router.post("/users/login", loginUser);

router.get("/users", getUser);

router.get("/users/:id", getUserById);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
