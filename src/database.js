const { database } = require('./config')
const { promisify } = require('util')
const { Pool } = require('pg')

const pool = new Pool(database)

pool.connect((err, client) => {
    if (err) {
        return console.error('Error en la conexión: ', err.stack)
    }

    if (client) client.release();
    console.log('DB conectada');
    return;
})
const registrarError = async (methodName, error) => {
    try {
        const query = 'INSERT INTO log_error (metodo, error) VALUES ($1, $2)';
        const values = [methodName, error.toString()];
        await pool.query(query, values);
    } catch (dbError) {
        console.error('Error al registrar el error en la base de datos:', dbError);
    }
};


pool.query = promisify(pool.query)

module.exports = {pool,registrarError}