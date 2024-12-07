const { verifyJwt } = require("../utils/generateToken");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await verifyJwt(token); // Assuming `verifyJwt` is synchronous; otherwise, await this.
    req.user = user.id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

module.exports = { verifyUser };
