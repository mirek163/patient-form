const { connectDatabase, sequelize } = require('./config/database');
const {User, DoctorWorker} = require('./models/User');
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
    const bcrypt = require('bcrypt');
    const hashedPasswordmaster = await bcrypt.hash('doctor@test.cz', 10);
    const hashedPassworddoctor1 = await bcrypt.hash('doctor1@test.cz', 10);
    const hashedPassworddoctor2 = await bcrypt.hash('doctor2@test.cz', 10);

    const hashedPasswordworker1 = await bcrypt.hash('worker1@test.cz', 10);
    const hashedPasswordworker2 = await bcrypt.hash('worker2@test.cz', 10);
    const hashedPasswordworker3 = await bcrypt.hash('worker3@test.cz', 10);


    // master 
    const masterUser = await User.create({
      email: 'doctor@test.cz',
      password: hashedPasswordmaster,
      role: 'master',
    });

    // doctor 
    const doctorUser1  = await User.create({
      email: 'doctor1@test.cz',
      password: hashedPassworddoctor1,
      role: 'doctor',
    });

    const doctorUser2  = await User.create({
      email: 'doctor2@test.cz',
      password: hashedPassworddoctor2,
      role: 'doctor',
    });

    // worker 
    const worker1 = await User.create({
      email: 'worker1@test.cz',
      password: hashedPasswordworker1,
      role: 'worker',
    });

    const worker2 = await User.create({
      email: 'worker2@test.cz',
      password: hashedPasswordworker2,
      role: 'worker',
    });
    const worker3 = await User.create({
      email: 'worker3@test.cz',
      password: hashedPasswordworker3,
      role: 'worker',
    });

    await DoctorWorker.create({
      doctor_id: doctorUser1.user_id,
      worker_id: worker1.user_id,
    });

    await DoctorWorker.create({
      doctor_id: doctorUser1.user_id,
      worker_id: worker2.user_id,
    });

    await DoctorWorker.create({
      doctor_id: doctorUser2.user_id,
      worker_id: worker3.user_id,
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
      created_by: 4,
    });

    await Record.create({
      patient_id: 1,
      author_id: 4, 
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
