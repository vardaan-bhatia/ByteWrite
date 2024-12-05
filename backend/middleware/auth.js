const { verifyJwt } = require("../utils/generateToken");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const user = await verifyJwt(token); // Assuming `verifyJwt` is synchronous; otherwise, await this.
    req.user = user.id;
    console.log(req.user);

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

module.exports = { verifyUser };
