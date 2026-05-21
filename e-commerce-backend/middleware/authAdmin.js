const isAdmin = (req, res, next) => {
  console.log("Is Admin");
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied, Admin only" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = isAdmin;
