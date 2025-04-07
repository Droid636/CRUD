const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
  idAula: String,
  descripcion: String,
  proposito: String
});

module.exports = mongoose.model('Aula', aulaSchema);
