const cloudinary = require("cloudinary").v2;
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "blog-app",
    });
    return result;
    console.log("result");
  } catch (error) {
    return error;
  }
};
module.exports = uploadImage;
