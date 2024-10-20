const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models'); // Asegúrate de importar los modelos correctos
const validator = require('validator');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { usuario, email, password, role } = req.body;

  // Validaciones básicas
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido' });
  }
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  // Saneamiento básico
  const cleanUsername = validator.escape(usuario);
  const cleanEmail = validator.normalizeEmail(email);

  try {
    // Buscar el rol en la base de datos
    const roleRecord = await Rol.findOne({ where: { nombre: role } });
    
    if (!roleRecord) {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await Usuario.create({
      usuario: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      id_rol: roleRecord.id, // Asigna el ID del rol correspondiente
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: user.id,
        usuario: user.usuario,
        email: user.email,
        role: roleRecord.nombre,  // Mostrar el nombre del rol en la respuesta
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo registrar el usuario' });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido' });
  }
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  // Saneamiento del email
  const cleanEmail = validator.normalizeEmail(email);

  try {
    // Buscar el usuario en la base de datos por su email
    const user = await Usuario.findOne({
      where: { email: cleanEmail },
      include: [{ model: Rol, as: 'rol' }] // Incluir el rol asociado
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: user.id, role: user.rol.nombre },  // Incluir el rol en el token JWT
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        usuario: user.usuario,
        email: user.email,
        role: user.rol.nombre, // Mostrar el nombre del rol en la respuesta
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
