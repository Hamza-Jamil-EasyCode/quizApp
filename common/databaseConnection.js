const { Sequelize } = require('sequelize');
require('dotenv').config({path:"../.env"})
console.log("🚀 ~ file: databaseConnection.js:11 ~ process.env.db_username:", process.env.db_username)

var database = new Sequelize({
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.database,
    dialect: 'mysql',
    host:process.env.db_host,
    port:parseInt(process.env.db_Port),
    logging: console.log
});
database
    .authenticate()
    .then(() => {
        console.log('database connected');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = database;
