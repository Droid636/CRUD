const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
  idDocente: String,
  nombre: String,
  apellidos: String,
  programaEducativo: String,
  numeroEmpleado: String,
  edad: Number,
  celular: String,
  curp: String,
  usuario: String,
  contrasena: String
});

module.exports = mongoose.model('Docente', docenteSchema);
