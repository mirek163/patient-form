const express = require('express'); // Express framework pro vytvoření serveru
const cors = require('cors'); // CORS middleware pro povolení požadavků z jiných domén
const initializeDatabase = require('./db'); 
const Patient = require('./models/Patient');
const Record = require('./models/Record');
const {User, DoctorWorker} = require('./models/User');

const authenticate = require("./middleware/authMiddleware"); 
const authRoutes = require("./auth"); 
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage })
const roleMiddleware = require('./middleware/roleMiddleware');

// Vytvoření instance Express aplikace
const app = express();

// Middleware pro parsování JSON těla požadavku
app.use(express.json());

app.use(cors()); // Povolení CORS pro všechny routy (API může být voláno z jiných domén)

// -----Routy----- 
//Přihlášení a registrace
app.use("/auth", authRoutes); 


// Dashboard pro master roli
app.get('/dashboard', authenticate, roleMiddleware(['master']), async (req, res) => {
  console.log("Dashboard API called");
  try {
    // Získej doctore s workeri
    const doctorsWithWorkers = await User.findAll({
      where: { role: 'doctor' },
      attributes: ['user_id', 'email', 'role'],
      include: [
        {
          model: DoctorWorker,
          as: 'assignedworkers',
          include: [
            {
              model: User,
              as: 'worker',
              attributes: ['user_id', 'email', 'role'],
            },
          ],
        },
      ],
    });
    console.log('Pracovníci:', JSON.stringify(doctorsWithWorkers, null, 2));

    res.status(200).json({
      doctorsWithWorkers: doctorsWithWorkers,
    });
  } catch (error) {
    console.error('Nepodařilo se získat data:', error.message);
    res.status(500).json({ error: 'Unable to fetch dashboard data' });
  }
});





// Odstranit uživatele
app.delete('/users/:id', authenticate, roleMiddleware(['master']), async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Uživatel nenalezen" });

    await user.destroy();
    res.status(200).json({ message: "Uživatel uspěšně smazán" });
  } catch (error) {
    console.error("Chyba v odstranění uživatele:", error.message);
    res.status(500).json({ error: "Nepovedlo se odstranit uživatele" });
  }
});

// Změna role pro uživatele
app.put('/users/:id/role', authenticate, roleMiddleware(['master']), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['master', 'doctor', 'worker'].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ error: "Unable to update role" });
  }
});











// získej všechny pečovatele přiřazené k doktorovi 
app.get('/workers', authenticate, roleMiddleware(['doctor']), async (req, res) => {
  try {
    const assignedworkers = await DoctorWorker.findAll({
      where: { doctor_id: req.user.id },
      include: [
        {
          model: User,
          as: 'worker',
          attributes: ['user_id', 'email', 'role'],
        },
      ],
    });

    const workers = assignedworkers.map((relation) => relation.worker);

    res.status(200).json(workers);
  } catch (error) {
    console.error("Error fetching workers:", error.message);
    res.status(500).json({ error: "Unable to fetch workers" });
  }
});









// Přidání pacienta
app.post('/patients',authenticate, roleMiddleware(['worker','master']), async (req, res) => {
  const recordData = { ...req.body, created_by: req.user.id };
  try {
    // Vytvoření nového pacienta
    const patient = await Patient.create(recordData); 
    res.status(201).json(patient); // Odeslání vytvořeného pacienta
  } catch (error) {
    console.error("Chyba při přidávání:", error.message);
    res.status(400).json({error});
  }
});



// Nalezení pacienta
app.get('/patients',authenticate, roleMiddleware(['worker']), async (req, res) => {
  try {
    //console.log(req.user.id);
    const patients = await Patient.findAll({
      where: { created_by: req.user.id },
    });
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

// Je potřeba definovat adresu k fotce
app.get('/patients/:patientId/records/:recordId/photo',authenticate, async (req, res) => {
  const { patientId, recordId } = req.params;

  try {
    const record = await Record.findOne({
      where: { record_id: recordId, patient_id: patientId },
    });

    if (!record || !record.photo) {
      return res.status(404).json({ error: "Fotka nenalezena" });
    }

    res.set("Content-Type", "image/png"); 
    res.send(record.photo);
  } catch (error) {
    console.error("Error fetching photo:", error.message);
    res.status(500).json({ error: "Unable to fetch photo" });
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
      return res.status(404).json({ error: "Záznam nebyl nalezen pro pacienta" });
    }

    res.status(200).json(record); 
  } catch (error) {
    console.error("Error fetching record:", error.message);
    res.status(500).json({ error: "Unable to fetch the record" });
  }
});



// Přidání záznamu pro pacienta ( prozatím přidání pouze jednoho obrázku )
app.post('/patients/:id/records',authenticate,upload.single("photo"), async (req, res) => {
  console.log("POST /patients/:id/records endpoint hit");

  const { id: patientId } = req.params;

  if (!patientId) {
    return res.status(400).json({ error: "Invalid patient ID" });
  }

  try {
    // spoj patient_id s request body
    const recordData = { ...req.body, patient_id: patientId, author_id: req.user.id, photo: req.file ? req.file.buffer : null };

    // Vytvoř nový záznam
    const record = await Record.create(recordData);

    console.log("Záznam vytvořen úspěšně:", record);
    res.status(201).json(record); 
  } catch (error) {
    console.error("Error:", error.message);
  }
});


// Spuštění serveru
initializeDatabase().then(() => { 
  require("dotenv").config();
  app.listen(process.env.PORT, () => { 
    console.log(`⚡ Server běží na portu: ${process.env.PORT}⚡`); 
  });
});



/// node index.js
