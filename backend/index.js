const express = require('express'); // Express framework pro vytvoření serveru
const cors = require('cors'); // CORS middleware pro povolení požadavků z jiných domén
const initializeDatabase = require('./db'); 
const Patient = require('./models/Patient');
const Record = require('./models/Record');
const authenticate = require("./middleware/authMiddleware"); 
const authRoutes = require("./auth"); 

// Vytvoření instance Express aplikace
const app = express();

// Middleware pro parsování JSON těla požadavku
app.use(express.json());

app.use(cors()); // Povolení CORS pro všechny routy (API může být voláno z jiných domén)

// -----Routy----- 
//Přihlášení a registrace
app.use("/auth", authRoutes); 

// Přidání pacienta
app.post('/patients', authenticate, async (req, res) => {
  try {
    // Vytvoření nového pacienta
    const patient = await Patient.create(req.body); 
    res.status(201).json(patient); // Odeslání vytvořeného pacienta
  } catch (error) {
    console.error("Chyba při přidávání:", error.message);
    res.status(400).json({error});
  }
});

// Spuštění serveru
const PORT = 5000; 
initializeDatabase().then(() => { 
  app.listen(PORT, () => { 
    console.log(`⚡ Server běží na portu: ${PORT}⚡`); 
  });
});
