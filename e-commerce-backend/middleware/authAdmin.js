const isAdmin = (req, res, next) => {
  try {
    if (req.body.user.role != "admin") {
      return res.status(403).json({ message: "Access Denied , Admin only" });
    }

    console.log("Is Admin");

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = isAdmin;
