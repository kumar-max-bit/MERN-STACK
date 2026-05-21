const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No Authorization header provided" });
    }

    const tokenParts = authHeader.trim().split(/\s+/);
    if (tokenParts.length < 2 || tokenParts[0].toLowerCase() !== "bearer") {
      return res.status(401).json({ message: "Malformed Authorization token" });
    }

    const token = tokenParts[1];
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    req.user = decoded;
    console.log("Verified");

    return next();
  } catch (err) {
    if (err instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: "Token still not active" });
    }
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token Expired" });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "invalid token" });
    }
    return res.status(401).json({ message: "Authentication failed", error: err.message });
  }
};
module.exports = verifyToken;
