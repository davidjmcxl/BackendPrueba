require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//carpeta publica
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();
//rutas

app.use('/api/v1/compras',require('./routes/compras'));
app.use('/api/v1/ventas',require('./routes/ventas')); 
app.use('/api/v1/auth',require('./routes/auth')); 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    }
);