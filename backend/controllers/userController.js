const User = require("../models/userSchema");

const postUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter email" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter password" });
    }
    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  postUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
