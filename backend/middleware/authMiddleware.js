const jwt = require("jsonwebtoken");

// JWT Klíč
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  console.log("Authenticating request...");
  console.log("authMiddleware Headers:", req.headers.authorization);

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Žádný token, autorizace nepřijmuta" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token není validní" });
  }
};

module.exports = authenticate;
