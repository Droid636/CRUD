const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Docente = require('../models/Docente');
const Alumno = require('../models/Alumno');

const router = express.Router();

router.post('/registro', async (req, res) => {
  const { usuario, contrasena, tipo } = req.body;

  const hashedPassword = await bcrypt.hash(contrasena, 10);
  let nuevoUsuario;

  if (tipo === 'admin') {
    nuevoUsuario = new Admin({ usuario, contrasena: hashedPassword });
  } else if (tipo === 'docente') {
    nuevoUsuario = new Docente({ usuario, contrasena: hashedPassword });
  } else if (tipo === 'alumno') {
    nuevoUsuario = new Alumno({ usuario, contrasena: hashedPassword });
  } else {
    return res.status(400).json({ mensaje: 'Tipo de usuario inválido' });
  }

  await nuevoUsuario.save();
  res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
});

module.exports = router;
