const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('master', 'doctor', 'worker'), allowNull: true },
});

const DoctorWorker = sequelize.define('DoctorWorker', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'user_id' },
    allowNull: false,
  },
  worker_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'user_id' },
    allowNull: false,
  },
});


User.hasMany(DoctorWorker, { foreignKey: 'doctor_id', as: 'assignedworkers' });
User.hasMany(DoctorWorker, { foreignKey: 'worker_id', as: 'doctorAssignments' });

DoctorWorker.belongsTo(User, { foreignKey: 'doctor_id', as: 'doctor' });
DoctorWorker.belongsTo(User, { foreignKey: 'worker_id', as: 'worker' });

module.exports = {User, DoctorWorker}
