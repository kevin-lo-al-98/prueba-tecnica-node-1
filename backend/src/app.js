const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const helmet = require('helmet');

// Inicializar variables de entorno
dotenv.config();

// Inicializar la aplicación de Express
const app = express();

// Proteger la aplicación con encabezados de seguridad
app.use(helmet());

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);

module.exports = app;
