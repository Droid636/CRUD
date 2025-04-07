const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');
const Docente = require('../models/Docente');
const Admin = require('../models/Admin');

router.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener alumnos' });
  }
});

router.get('/docentes', async (req, res) => {
  try {
    const docentes = await Docente.find();
    res.json(docentes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener docentes' });
  }
});

router.get('/administrativos', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener administrativos' });
  }
});

module.exports = router;
