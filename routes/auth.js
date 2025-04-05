const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Docente = require('../models/Docente');
const Alumno = require('../models/Alumno');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  const roles = [
    { modelo: Admin, rol: 'admin' },
    { modelo: Docente, rol: 'docente' },
    { modelo: Alumno, rol: 'alumno' }
  ];

  for (const { modelo, rol } of roles) {
    const user = await modelo.findOne({ usuario });

    if (user && await bcrypt.compare(contrasena, user.contrasena)) {
      const token = jwt.sign({ id: user._id, rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, rol });
    }
  }

  res.status(401).json({ mensaje: 'Credenciales inválidas' });
});
module.exports = router;
