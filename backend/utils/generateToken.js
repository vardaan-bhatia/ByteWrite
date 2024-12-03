require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateJwt = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyJwt = async (token) => {
  try {
    const isValid = await jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (error) {
    console.error("Invalid Token:", error);
    throw error;
  }
};

module.exports = { generateJwt, verifyJwt };
