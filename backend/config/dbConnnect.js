require("dotenv").config();
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(MONGO_DB_URL);
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDb;
