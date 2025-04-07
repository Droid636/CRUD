const mongoose = require('mongoose');

const asignaturaSchema = new mongoose.Schema({
  idAsignatura: String,
  nombre: String,
  programaEducativo: String,
  idDocente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Docente'
  }
});

module.exports = mongoose.model('Asignatura', asignaturaSchema);
