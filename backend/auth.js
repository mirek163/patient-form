const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("./models/User");

const router = express.Router();

// JWT Klíč
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// routa pro registraci
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Špatně zadaný email"),
    body("password").isLength({ min: 6 }).withMessage("Heslo musí mít alespoň 6 charakterů"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    try {
      // Koukni, jestli uživatel už není registrovaný
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email už je registrovaný" });
      }

      // Zahashuj heslo
      const hashedPassword = await bcrypt.hash(password, 10);

      // Ulož uživatele
      const user = await User.create({ email, password: hashedPassword, role });
      res.status(201).json({ message: "Úspěšná registrace!", user: { email, role } }); //není volaná na fronendu, pouze errory  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// routa pro login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Špatně zadaný email"),
    body("password").notEmpty().withMessage("Zadejte heslo"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Projet emaily
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Email nenalezen" });
      }

      // Porovnej hesla
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Špatné údaje" });
      }

      // Vytvoř token ( trvání na hodinu)
      const token = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ message: "Úspěšně přihlášeno", token, user: { email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
