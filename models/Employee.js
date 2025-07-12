const { DataTypes } = require("sequelize");
const db = require("../db");

const Project = require("./Project");
const EmployeeDailyCalendar = require("./EmployeeDailyCalendar");
const EmployeeWorkEntry = require("./EmployeeWorkEntry");
const MonthlyWorkValidation = require("./MonthlyWorkValidation");
const Timesheetssigned = require("./Timesheetssigned");

const Employee = db.sequelize.define(
    "Employees",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        //telefono
        tlf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Employee.hasMany(EmployeeDailyCalendar);
EmployeeDailyCalendar.belongsTo(Employee);

Employee.hasMany(EmployeeWorkEntry);
EmployeeWorkEntry.belongsTo(Employee);

Employee.hasMany(MonthlyWorkValidation);
MonthlyWorkValidation.belongsTo(Employee);

Employee.hasMany(Timesheetssigned);
Timesheetssigned.belongsTo(Employee);

module.exports = Employee;
