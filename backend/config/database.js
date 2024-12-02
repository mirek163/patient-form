const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('patientDB', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('🚀 MySQL Databáze připojena! 🚀');
  } catch (error) {
    console.error('❌Nepodařilo se připojit k databázi❌:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDatabase };
