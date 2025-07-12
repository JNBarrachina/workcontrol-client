const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("workcontroldb", "root", "root", {
    //Password123#@! or root
    host: "localhost",
    dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;

module.exports = db;
