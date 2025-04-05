const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  usuario: String,
  contrasena: String
});

module.exports = mongoose.model('Admin', adminSchema);
