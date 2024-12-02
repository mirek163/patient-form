const { connectDatabase, sequelize } = require('./config/database');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Record = require('./models/Record');

const initializeDatabase = async () => {
  await connectDatabase();
  try {
    await sequelize.sync({ force: true }); ˇ// při spuštění promaz tabulky a vytvoř je dle modelu v backendu 
    console.log('✅ Tabulky byly načteny z databáze ✅');
  } catch (error) {
    console.error('❌Chyba při načítání tabulek❌:', error);
  }
};

module.exports = initializeDatabase;
