require('dotenv').config()
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});