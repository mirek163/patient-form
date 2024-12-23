const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Patient = require("./Patient");
const { User } = require('./User');


const Record = sequelize.define("Record", {
  record_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: { model: Patient, key: "patient_id" },
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "user_id" },
  },
  record_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  record_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  defect_diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mkn11: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anamnesis: {
    type: DataTypes.TEXT,
  },
  social_anamnesis: {
    type: DataTypes.TEXT,
  },
  defect_description: {
    type: DataTypes.TEXT,
  },
  lateralization: {
    type: DataTypes.STRING,
  },
  wound_size: {
    type: DataTypes.STRING,
  },
  bed_color: {
    type: DataTypes.STRING,
  },
  edges: {
    type: DataTypes.STRING,
  },
  secretion: {
    type: DataTypes.STRING,
  },
  odor: {
    type: DataTypes.STRING,
  },
  surrounding_tissue: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.BLOB("long"), //  BLOB pro binanární data (multer)
    allowNull: true, 
  },
});

Patient.hasMany(Record, { foreignKey: "patient_id", as: "records" });
Record.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });
Record.belongsTo(User, { foreignKey: "author_id", as: "author" });

module.exports = Record;
