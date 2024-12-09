const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const signUpload = async () => {
      const timestamp = Math.round(newDate() / 1000);
      const signature = await cloudinary.utils.api_sign_request(
        timestamp,
        process.env.CLOUDINARY_API_SECRET
      );
      return { timestamp, signature };
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = cloudinaryConfig;
