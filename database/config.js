const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

const conexion = mysql.createPool(database);

conexion.getConnection((error, connection) =>{
    if(error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexion con la base de datos perdida');
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('Demasiadas conexiones');
        }
        if(error.code === 'ECONNREFUSED'){
            console.error('Conexion rechazada');
        }
    }
    if(connection){
        connection.release();
        console.log('Conexion establecida');
        return;
    }

});

conexion.query = promisify(conexion.query);

module.exports = conexion;






