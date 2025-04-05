const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
  usuario: String,
  contrasena: String
});

module.exports = mongoose.model('Docente', docenteSchema);
