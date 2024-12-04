const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Patient = require('./Patient');
const User = require('./User');

const Record = sequelize.define('Record', {
  record_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  patient_id: { type: DataTypes.INTEGER, references: { model: Patient, key: 'patient_id' } },
  author_id: { type: DataTypes.INTEGER, references: { model: User, key: 'user_id' } },
  record_date: { type: DataTypes.DATE, allowNull: false },
  defect_diagnosis: { type: DataTypes.TEXT, allowNull: false },
  mkn11: { type: DataTypes.STRING },
  anamnesis: { type: DataTypes.TEXT },
  defect_description: { type: DataTypes.TEXT },
  photo: { type: DataTypes.TEXT },
  signal_code_request: { type: DataTypes.STRING },
});

Patient.hasMany(Record, { foreignKey: 'patient_id', as: 'records' });
Record.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
Record.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
module.exports = Record;
