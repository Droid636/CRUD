const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  usuario: String,
  contrasena: String
});

module.exports = mongoose.model('Alumno', alumnoSchema);
