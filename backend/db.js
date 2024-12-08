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
  } catch (error) {
    console.error('❌Chyba při načítání tabulek❌:', error);
  }
};

module.exports = initializeDatabase;
