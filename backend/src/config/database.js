require('dotenv').config();
const { Sequelize } = require('sequelize');

// Cargar la URL de la base de datos desde las variables de entorno
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL no está definida. Asegúrate de que las variables de entorno están configuradas correctamente.');
}

// Crear la instancia de Sequelize con la URL de la base de datos
const sequelizeDb = new Sequelize(databaseUrl, {
  dialect: 'postgres', // o el dialecto que estés usando (MySQL, SQLite, etc.)
  logging: false, // Cambia a true si quieres ver las consultas SQL en la consola
});

module.exports = sequelizeDb;