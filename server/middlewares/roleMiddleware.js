module.exports = function (requiredRole) {
    return (req, res, next) => {
      if (req.user.role === requiredRole) {
        return next();
      }
      return res.status(403).json({ message: "Forbidden - Not enough privilege" });
    };
  };
  