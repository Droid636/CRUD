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



// Eliminar Alumno
router.delete('/alumnos/:id', async (req, res) => {
    try {
      await Alumno.findByIdAndDelete(req.params.id);
      res.json({ message: 'Alumno eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar alumno' });
    }
  });
  
  // Actualizar Alumno
  router.put('/alumnos/:id', async (req, res) => {
    try {
      const alumno = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(alumno);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar alumno' });
    }
  });
  
  // Eliminar Docente
  router.delete('/docentes/:id', async (req, res) => {
    try {
      await Docente.findByIdAndDelete(req.params.id);
      res.json({ message: 'Docente eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar docente' });
    }
  });
  
  // Actualizar Docente
  router.put('/docentes/:id', async (req, res) => {
    try {
      const docente = await Docente.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(docente);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar docente' });
    }
  });
  
  // Eliminar Administrativo
  router.delete('/administrativos/:id', async (req, res) => {
    try {
      await Admin.findByIdAndDelete(req.params.id);
      res.json({ message: 'Administrativo eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar administrativo' });
    }
  });
  
  // Actualizar Administrativo
  router.put('/administrativos/:id', async (req, res) => {
    try {
      const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar administrativo' });
    }
  });
  
module.exports = router;
