const { DataTypes } = require("sequelize");
const db = require("../db");


const DayCode = require("./DayCode");

const EmployeeDailyCalendar = db.sequelize.define(
    "EmployeeDailyCalendar",
    {
        date: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
        timestamps: false,
    }
);

EmployeeDailyCalendar.belongsTo(DayCode);
DayCode.hasMany(EmployeeDailyCalendar);

module.exports = EmployeeDailyCalendar;
