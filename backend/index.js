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

// Nalezení pacienta
app.get('/patients',authenticate, async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Chyba při získávání pacientů:", error.message);
    res.status(500).json({ error: "Nelze načíst pacienty" });
  }
});

// Nalezení záznamu pro pacienta
app.get('/patients/:patientId',authenticate, async (req, res) => {
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

// Zobrazení konkrétního záznamu pro pacienta
app.get('/patients/:patientId/records/:recordId', authenticate, async (req, res) => {
  const { patientId, recordId } = req.params; 

  try {
    const record = await Record.findOne({
      where: { record_id: recordId, patient_id: patientId },
      include: [
        { model: User, as: 'author', attributes: ['email'] }, 
        { model: Patient, as: 'patient', attributes: ['first_name', 'last_name'] }, 
      ],
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found for this patient" });
    }

    res.status(200).json(record); 
  } catch (error) {
    console.error("Error fetching record:", error.message);
    res.status(500).json({ error: "Unable to fetch the record" });
  }
});



// Přidání záznamu pro pacienta
app.post('/patients/:id/records',authenticate, async (req, res) => {
  console.log("POST /patients/:id/records endpoint hit");

  const { id: patientId } = req.params;
  //console.log("Patient ID:", patientId);
  //console.log("Incoming payload:", req.body);
  //console.log("Authenticated User:", req.user);

  if (!patientId) {
    return res.status(400).json({ error: "Invalid patient ID" });
  }

  try {
    // spoj patient_id s request body
    const recordData = { ...req.body, patient_id: patientId, author_id: req.user.id };

    // Vytvoř nový záznam
    const record = await Record.create(recordData);

    console.log("Záznam vytvořen úspěšně:", record);
    res.status(201).json(record); 
  } catch (error) {
    console.error("Error:", error.message);
  }
});


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