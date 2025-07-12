const { DataTypes } = require("sequelize");
const db = require("../db");

const Timesheetssigned = db.sequelize.define(
    "Timesheetssigned",
    {
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isSigned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
);


module.exports = Timesheetssigned;
