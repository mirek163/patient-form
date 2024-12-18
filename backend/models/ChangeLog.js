const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Record = require("./Record");
const User = require("./User");

const ChangeLog = sequelize.define("ChangeLog", {
  change_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  record_id: {
    type: DataTypes.INTEGER,
    references: { model: Record, key: "record_id" },
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "user_id" },
    allowNull: false,
  },
  change_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Record.hasMany(ChangeLog, { foreignKey: "record_id", as: "changeLogs" });
ChangeLog.belongsTo(Record, { foreignKey: "record_id", as: "record" });
ChangeLog.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = ChangeLog;
