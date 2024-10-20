const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa la conexión a la base de datos
const Usuario = require('./Usuario');

const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,  // El nombre del rol debe ser único
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true, // La descripción es opcional
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'rol',  // Nombre exacto de la tabla en la base de datos
  timestamps: false,  // Desactiva los timestamps automáticos de Sequelize (ya gestionas created_at y updated_at manualmente)
});


// Un Rol puede tener muchos Usuarios
Rol.hasMany(Usuario, { foreignKey: 'id_rol', as: 'usuario' });

module.exports = Rol;
