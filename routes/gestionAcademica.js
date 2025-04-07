const express = require('express');
const router = express.Router();
const Asignatura = require('../models/Asignatura');
const Aula = require('../models/Aula');
const Horario = require('../models/Horario');
const Docente = require('../models/Docente');
const Alumno = require('../models/Alumno');


// Ruta para crear asignatura
router.post('/asignatura', async (req, res) => {
  try {
    const nueva = new Asignatura(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para crear aula
router.post('/aula', async (req, res) => {
  try {
    const nueva = new Aula(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para crear horario
router.post('/horario', async (req, res) => {
  try {
    const nuevo = new Horario(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los docentes
router.get('/docentes', async (req, res) => {
    const docentes = await Docente.find();
    res.json(docentes);
  });
  
  // Obtener todos los alumnos
  router.get('/alumnos', async (req, res) => {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  });
  
  // Obtener todas las asignaturas
  router.get('/asignaturas', async (req, res) => {
    const asignaturas = await Asignatura.find();
    res.json(asignaturas);
  });
  

module.exports = router;
