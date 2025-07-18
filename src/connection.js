const { Sequelize } = require('sequelize');
const { database } = require('./config')

const db = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    port: database.port,
    dialect: 'postgres',
})

// const db = new Sequelize("postgres", "postgres", "7733", {
//     host: "localhost",
//     port: 5432,
//     dialect: 'postgres',
//     logging: false,
// } );


module.exports = { db };