
const express = require('express');
require('dotenv').config();



//Crear un servidor express
const app = express();



//Rutas

//Directorio publico
app.use(express.static('public'));
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 4000');
});

