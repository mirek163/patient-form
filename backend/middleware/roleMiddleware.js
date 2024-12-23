const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const { user } = req;
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  