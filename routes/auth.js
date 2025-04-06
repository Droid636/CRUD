const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Docente = require('../models/Docente');
const Alumno = require('../models/Alumno');

const router = express.Router();

// Middleware de validación de datos
function validarDatos(req, res, next) {
  const { usuario, contrasena } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
  }
  next();
}

router.post('/login', validarDatos, async (req, res) => {
  const { usuario, contrasena } = req.body;

  // Crear una función para evitar la repetición de código
  const buscarUsuario = async (modelo) => {
    return await modelo.findOne({ usuario });
  };

  try {
    // Buscar en los diferentes modelos de usuarios (Admin, Docente, Alumno)
    let user = await buscarUsuario(Admin);
    if (user) return verificarContrasena(user, 'admin');
    
    user = await buscarUsuario(Docente);
    if (user) return verificarContrasena(user, 'docente');

    user = await buscarUsuario(Alumno);
    if (user) return verificarContrasena(user, 'alumno');

    // Si no se encuentra el usuario en ninguno de los modelos
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }

  // Función para verificar la contraseña y generar un token
  function verificarContrasena(user, rol) {
    bcrypt.compare(contrasena, user.contrasena, (err, result) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al comparar las contraseñas' });
      }
      if (result) {
        // Si la contraseña es correcta, generamos un token
        const token = jwt.sign({ id: user._id, rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, rol });
      } else {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
    });
  }
});

module.exports = router;
