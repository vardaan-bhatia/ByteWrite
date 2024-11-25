const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/dbConnnect");
const User = require("./models/userSchema");

app.use(express.json());
app.use(cors());

async function createUsers() {
  try {
    let newUser = await User.create({
      email: "vardaan@gmail.com",
      password: "Vardaan",
      name: "Vardaan",
    });
    console.log(newUser);
  } catch (error) {
    console.log(error.code);
  }
}

app.listen(3000, () => {
  console.log("server started");
  connectDb();
  createUsers();
});
