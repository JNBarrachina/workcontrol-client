const { DataTypes } = require("sequelize");
const db = require("../db");

const MonthlyWorkValidation = db.sequelize.define(
    "MonthlyWorkValidation",
    {
        year: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        isSignedByEmployee: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        signedAtEmployee: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isSignedBySupervisor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        signedAtSupervisor: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = MonthlyWorkValidation;
