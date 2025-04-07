const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
  idHorario: String,
  fecha: String,
  idDocente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Docente'
  },
  idAlumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno'
  },
  idAsignatura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asignatura'
  }
});

module.exports = mongoose.model('Horario', horarioSchema);
