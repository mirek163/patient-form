const { connectDatabase, sequelize } = require('./config/database');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Record = require('./models/Record');

const initializeDatabase = async () => {
  await connectDatabase();
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true }); // při spuštění promaz tabulky a vytvoř je dle modelu v backendu 
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Tabulky byly načteny z databáze ✅');

    // Testovací data
    const hashedPassword = await require('bcrypt').hash('doctor@test.cz', 10);
    await User.create({
      email: 'doctor@test.cz',
      password: hashedPassword,
      role: 'doctor',
    });

    await Patient.create({
      first_name: 'Jan',
      last_name: 'Novák',
      birth_number: '1234567890',
      address: 'Hlavní 123, Praha 1',
      insurance: 'VZP',
      doctor_name: 'MUDr. Jan Černý',
      doctor_contact: '+420123456789',
      adp_name: 'Alena Nováková',
      adp_contact: '+420987654321',
      adp_head_nurse: 'Marie Nováková',
    });

    await Record.create({
      patient_id: 1,
      author_id: 1, 
      record_date: new Date(),
      record_time: new Date().toLocaleTimeString(),
      defect_diagnosis: 'Zlomenina nohy',
      mkn11: 'S72',
      anamnesis: 'Pacient má historii zranění při sportu.',
      social_anamnesis: 'Bez problémů v rodině.',
      defect_description: 'Fraktura levé holenní kosti.',
      lateralization: 'Levá',
      wound_size: '5 cm',
      bed_color: 'Bílá',
      edges: 'Ostré',
      secretion: 'Žádné',
      odor: 'Normální',
      surrounding_tissue: 'Nezasaženo',
      photo: 'photo.jpg',
    });

    console.log('✅ Výchozí data byla úspěšně vytvořena ✅');

  } catch (error) {
    console.error('❌Chyba při načítání tabulek❌:', error);
  }
};

module.exports = initializeDatabase;
