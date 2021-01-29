require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./database/config');

//Creando el servidor
const app = express();

//Configurar Cors
app.use(cors());

//Base de Datos
connectDB();



app.get('/', (req, res) => res.send('Hola mundo'));
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));

















//mean_users
//7x973fxHR92Lx4xS