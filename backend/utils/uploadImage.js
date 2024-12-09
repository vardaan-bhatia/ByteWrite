const cloudinary = require("cloudinary").v2;
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "blog-app",
    });
    return result;
  } catch (error) {
    return error;
  }
};

const destroyImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = { uploadImage, destroyImage };
