
const express = require('express');
require('dotenv').config();



//Crear un servidor express
const app = express();


const cors = require("cors");


// Types
/*
    type: 0 - No hay token válido
    type: 1 - No hay elementos
    type: 2 - La peticion se hizo correctamente
    type: 3 - Error dentro del servidor
    type: 4 - Usuario no autorizado
*/ 



//Rutas

//Directorio publico
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/categories',require('./routes/categories'));
app.use('/api/products',require('./routes/product'));
app.use('/api/proveedor',require('./routes/proveedor'));
app.use('/api/public',require('./routes/public'));
app.use('/api/people',require('./routes/people'));
app.use('/api/employee',require('./routes/employee'));
app.use('/api/users',require('./routes/users'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 4000');
});




