const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/dbConnnect");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");
const cloudinaryConfig = require("./config/cloudinaryConfig");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.listen(3000, () => {
  connectDb();
  cloudinaryConfig();
});
