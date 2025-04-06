const bcrypt = require('bcryptjs');
const Alumno = require('../models/Alumno');
const Docente = require('../models/Docente');
const Admin = require('../models/Admin');

const express = require('express');
const router = express.Router();

router.post('/registro', async (req, res) => {
  const { rol, password, usuario, nombre, apellidos } = req.body;

  // Validar campos comunes
  if (!rol || !password || !usuario || !nombre || !apellidos) {
    return res.status(400).json({ message: 'Faltan campos obligatorios comunes' });
  }

  // Verificar si el usuario ya existe en cualquiera de los modelos
  const existingUser = await Alumno.findOne({ usuario }) || await Docente.findOne({ usuario }) || await Admin.findOne({ usuario });
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    // Validar y crear según el rol
    if (rol === 'alumno') {
      const { idAlumno, matricula, edad, celular, curp } = req.body;

      if (!idAlumno || !matricula || !edad || !celular || !curp) {
        return res.status(400).json({ message: 'Faltan campos requeridos para alumno' });
      }

      newUser = new Alumno({
        idAlumno,
        nombre,
        apellidos,
        matricula,
        edad,
        celular,
        curp,
        usuario,
        contrasena: hashedPassword
      });

    } else if (rol === 'docente') {
      const { idDocente, programaEducativo, numeroEmpleado, edad, celular, curp } = req.body;

      if (!idDocente || !programaEducativo || !numeroEmpleado || !edad || !celular || !curp) {
        return res.status(400).json({ message: 'Faltan campos requeridos para docente' });
      }

      newUser = new Docente({
        idDocente,
        nombre,
        apellidos,
        programaEducativo,
        numeroEmpleado,
        edad,
        celular,
        curp,
        usuario,
        contrasena: hashedPassword
      });

    } else if (rol === 'administrativo') {
      newUser = new Admin({
        nombre,
        apellidos,
        usuario,
        contrasena: hashedPassword
      });

    } else {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    // Guardar el usuario
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

module.exports = router;
