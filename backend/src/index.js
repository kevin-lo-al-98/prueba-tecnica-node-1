const app = require('./app');
const sequelizeDb = require('./config/database');

// Puerto de la aplicación
const PORT = process.env.PORT;

// Conectar a la base de datos y luego iniciar el servidor
sequelizeDb.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});
