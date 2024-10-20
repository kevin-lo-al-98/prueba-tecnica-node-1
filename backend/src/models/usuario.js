const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./Rol');  // Importar el modelo Rol

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),  // Se recomienda un tamaño mayor para almacenar el hash de la contraseña
    allowNull: false,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: 'id',
    },
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
  tableName: 'usuario',
  timestamps: false,
});

// Definir la relación entre Usuario y Rol
Usuario.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });

module.exports = Usuario;
