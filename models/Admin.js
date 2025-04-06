const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  usuario: String,
  contrasena: String
});

module.exports = mongoose.model('Admin', adminSchema);
