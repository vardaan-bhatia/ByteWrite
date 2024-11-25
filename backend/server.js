const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/dbConnnect");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.listen(3000, () => {
  console.log("server started");
  connectDb();
});
