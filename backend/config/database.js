const { Sequelize } = require('sequelize');

require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
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
