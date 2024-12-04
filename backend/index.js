const express = require('express'); // Express framework pro vytvoření serveru
const cors = require('cors'); // CORS middleware pro povolení požadavků z jiných domén
const initializeDatabase = require('./db'); 
const Patient = require('./models/Patient');
const Record = require('./models/Record');
const User = require('./models/User');
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
app.post('/patients', async (req, res) => {
  console.log("POST /patients endpoint hit");
  console.log("Incoming payload:", req.body);
  try {
    // Vytvoření nového pacienta
    const patient = await Patient.create(req.body); 
    res.status(201).json(patient); // Odeslání vytvořeného pacienta
  } catch (error) {
    console.error("Chyba při přidávání:", error.message);
    res.status(400).json({error});
  }
});
// pro post a getyy by melo byt aplikovano authenticate- Middleware. Nicmene mi to nefunguje

// Nalezení pacienta
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Chyba při získávání pacientů:", error.message);
    res.status(500).json({ error: "Nelze načíst pacienty" });
  }
});

// Nalezení záznamu pro pacienta
app.get('/patients/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findByPk(patientId, {
      include: [{ model: Record, as: 'records',
      include: [{ model: User, as: 'author',attributes: ['email'],
       }], 
      }],
    });
    if (!patient) {
      return res.status(404).json({ error: "Pacient nebyl nalezen" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Chyba při získávání detailů pacienta:", error.message);
    res.status(500).json({ error: "Nelze načíst detaily pacienta" });
  }
});

// Přidání záznamu pro pacienta (dodelat)
app.post('/patients/:id/records', async (req, res) => {});

// Zobrazení konkrétního záznamu pro pacienta (dodelat)
app.get('/patients/:id/records/:recordId', async (req, res) => {});

// Spuštění serveru
const PORT = 5000; 
initializeDatabase().then(() => { 
  app.listen(PORT, () => { 
    console.log(`⚡ Server běží na portu: ${PORT}⚡`); 
  });
});



/// node index.js

///INSERT INTO Records (patient_id, author_id, record_date, defect_diagnosis, mkn11, anamnesis, defect_description, photo, signal_code_request, createdAt, updatedAt) VALUES (1, 1, '2024-15-03', 'Example diagnosis text', 'A01', 'Example anamnesis text', 'Example defect description', 'example_photo_url.jpg', 'Signal123', NOW(), NOW());
///UPDATE users SET role = 'doctor' WHERE user_id = 1;