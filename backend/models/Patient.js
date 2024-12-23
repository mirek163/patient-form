const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { User } = require('./User');

const Patient = sequelize.define('Patient', {
  patient_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  birth_number: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  insurance: { type: DataTypes.STRING, allowNull: false },
  doctor_name: { type: DataTypes.STRING, allowNull: false },
  doctor_contact: { type: DataTypes.STRING, allowNull: false },
  adp_name: { type: DataTypes.STRING },
  adp_contact: { type: DataTypes.STRING },
  adp_head_nurse: { type: DataTypes.STRING },
  created_by: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'user_id' }, 
    allowNull: false,
  },
});

User.hasMany(Patient, { foreignKey: 'created_by', as: 'patients' });
Patient.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = Patient;
