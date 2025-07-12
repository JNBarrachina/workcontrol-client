const { DataTypes } = require("sequelize");
const db = require("../db");

const Subproject = require("./Subproject");

const Project = db.sequelize.define(
    "Projects",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isEuropean: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Project.hasMany(Subproject);
Subproject.belongsTo(Project);

module.exports = Project;
