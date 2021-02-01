require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./database/config');

//Creando el servidor
const app = express();

//Configurar Cors
app.use(cors());

//Lectura y Parseo del body

app.use(express.json());

//Base de Datos
connectDB();


app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/hospitales', require('./routes/hospitalesRoutes'));
app.use('/api/medicos', require('./routes/medicosRoutes'));
app.use('/api/login', require('./routes/authRoutes'));
app.use('/api/todo', require('./routes/busquedasRoutes'));

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));

















//mean_users
//7x973fxHR92Lx4xS