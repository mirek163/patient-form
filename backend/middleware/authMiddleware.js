const jwt = require("jsonwebtoken");

// JWT Klíč
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token chybí nebo je neplatný" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT Payload:", decoded); // Log
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    res.status(401).json({ message: "Token není validní" });
  }
};


module.exports = authenticate;
